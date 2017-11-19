'use strict';
// Server code for githelpers project.
// Author: Chris Buonocore (2017)
// License: MIT

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const pg = require('pg');
const path = require('path');
const { Pool } = require('pg');
const github = require('octonode');

// Variable and Server Setup //
const prod = false;

const csrfGuid = process.env.REACT_APP_FB_CSRF;
let globalAccessToken = "";

const dbUser = process.env.ADMIN_DB_USER;
const dbPass = process.env.ADMIN_DB_PASS;
const dbName = 'githelpers';
const connectionString = process.env.GITHELPERS_DATABASE_URL || `postgres://${dbUser}:${dbPass}@localhost:5432/${dbName}`;
const pool = new Pool({
  connectionString: connectionString,
})

const PORT = 9007;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!prod) {
  app.use(cors());
}

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Endpoints //

app.get('/guid', (req, res) => {
  return res.json(csrfGuid);
})

app.get('/api/hello', (req, res) => {
  return res.json("hello world");
});

app.get('/api/events/:count', (req, res, next) => {
  const countParam = req.params.count === undefined ? null : req.params.count;
  const count = Math.min(Math.abs(countParam), 8);

  pool.query('SELECT * FROM events ORDER BY id DESC limit ' + count, (err, res) => {
    console.log('events', err, res)
    if (err) {
      return res.status(500).json(err);
    }
    pool.end()
    return res.json(res.rows);
  })
});

app.get('/api/issues/:githubName', (req, res, next) => {
  const githubNameParam = req.params.githubName === undefined ? null : req.params.githubName;
  const githubName = Math.min(Math.abs(githubNameParam), 8);

  pool.query(`SELECT * FROM issues where githubName = "${githubName}`, (err, res) => {
    console.log('issues', err, res)
    if (err) {
      return res.status(500).json(err);
    }
    pool.end()
    return res.json(res.rows);
  })
});

// Perform the db search for the passed query -> return a list of active issue results
app.post('/api/search', (req, res) => {
  const body = req.body;
  const query = body.query.toLowerCase();
  // TODO: implement stronger search filtering (including languages).
  pool.query("select * from issues where body like $1", [`%${query}%`],
    function(err, res) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(res);
    });
});

app.post('/api/issues', (req, res) => {
  const body = req.body;
  const githubName = body.githubName
  const issues = body.issues;

  // TODO: determine if there is a way to batch this insert.
  issues.map((issue) => {
    const issueId = issue['id'];
    const issueBody = issue.body.toLowerCase();
    const url = issue.html_url;
    const languages = issue.languages;
    const title = issue.title;
    const created = issue.created;
    const state = issue.state;

    // upsert the posted issues to the githelpers db.
    const query = `if exist(select * from issues where id=${issueId}) {
      delete from issues where id=${issueId}
    } 
    insert into issues values (${issueId}, ${issueBody}, ${url}, ${languages}, ${title}, ${created}, ${state}, ${githubName})
    `;
    pool.query(query, (err, result) => {
      if (err) {
        console.log(`error inserting issue ${issueId}: ${err}`);
      }
    });
  })

  // Currently returns before the issues have been processed into the db.
  // TODO: make async.
  return res.status(200);
});

app.get('/api/rate_limit', (req, res) => {
  axios.get('https://api.github.com/rate_limit')
    .then(function (response) {
      console.log(response.data);
    });

  res.sendStatus(200);
});

app.post('/api/github', (req, res) => {
  // console.log(req);
  const body = req.body;
  const clientId = body.clientId;
  const clientSecret = body.clientSecret;
  const code = body.code;

  axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientId,
    client_secret: clientSecret,
    code: code
  }).then(function (response) {
    // console.log('token response:', JSON.stringify(response));
    console.log('token response:', response.data);
    // const resp = JSON.parse(response);
    const resp = response.data;
    const respArray = resp.split("&");
    const accessToken = respArray[0].split("=");

    globalAccessToken = accessToken[1];

    // Returns received Access Token
    return res.json(accessToken[1]);
  })
    .catch(function (error) {
      console.log('error getting access token from :', error);
      return res.json(error);
    });
});

// Socket IO handlers //

io.on('connection', function (client) {
  client.on('action', function (event) {
    pool.query('INSERT INTO events(name, time) values($1, $2)', [event.name, event.time]);
    console.log('action', JSON.stringify(event));
    io.emit('incoming', event)
  });
  client.on('disconnect', function () {
    console.log('user disconnect');
  });
});

// DB Connection and server start //

pool.connect((err, client, done) => {
  if (err) {
    console.error('postgres connection error', err)
    if (prod) {
      console.error('exiting')
      return;
    }
    console.error('continuing with disabled postgres db');
  }

  server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
  });
})