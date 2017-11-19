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
const github = require('octonode');

// Variable and Server Setup //
const prod = true;

const csrfGuid = process.env.REACT_APP_FB_CSRF;
let globalAccessToken = "";

const dbUser = process.env.ADMIN_DB_USER;
const dbPass = process.env.ADMIN_DB_PASS;
const dbName = 'githelpers';
const connectionString = process.env.GITHELPERS_DATABASE_URL 
  || `postgres://${dbUser}:${dbPass}@localhost:5432/${dbName}`;
console.log('connectionString', connectionString);

const pool = new pg.Pool({
  connectionString: connectionString,
})

const PORT = 9006;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { origins: '*:*'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: remove cors.
app.use(cors());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Endpoints //

app.get('/api/hello', (req, res) => {
  return res.json("hello world");
});

app.get('/api/events/:count', (req, res, next) => {
  const countParam = req.params.count === undefined ? null : req.params.count;
  const count = Math.min(Math.abs(countParam), 8);

  pool.query('SELECT * FROM events ORDER BY id DESC limit ' + count, (err, res) => {
    console.log('getEvents', err, count, result)
    if (err) {
      console.error('events error', err);
      return res.status(500).json(err);
    }
    // pool.end()
    return res.json(result.rows);
  })
});

app.get('/api/issues/:creator', (req, res, next) => {
  const creatorParam = req.params.creator === undefined ? null : req.params.creator;
  const creator = Math.min(Math.abs(creatorParam), 8);

  pool.query(`SELECT * FROM issues where creator=$1`, [`%${creator}%`], (err, result) => {
    if (err) {
      console.error('getIssuesForCreator error', err, creator, result)
      return res.status(500).json(err);
    }
    // pool.end()
    return res.json(result.rows);
  })
});

// Perform the db search for the passed query -> return a list of active issue results
app.post('/api/search', (req, res) => {
  const body = req.body;
  const query = body.query.toLowerCase();
  // TODO: implement stronger search filtering (including languages).
  pool.query("select * from issues where body like $1", [`%${query}%`],
    function(err, result) {
      if (err) {
        console.error('search error', err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result.rows);
    });
});

app.post('/api/issues', (req, res) => {
  const body = req.body;
  const issues = body.issues;
  const creator = body.creator;

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
    const upsertQuery = `UPDATE issues SET state=${state}, body=${issueBody} WHERE id=${issueId};
                         INSERT INTO issues (id, body, url, languages, title, created, state, creator)
                                SELECT ${issueId}, '${issueBody}', ${url}, ${languages}, ${title}, ${created}, ${state}, ${creator} 
                                WHERE NOT EXISTS (SELECT 1 FROM table WHERE id=${issueId});`;

    pool.query(upsertQuery, (err, result) => {
      if (err) {
        console.error(`error inserting issue ${issueId}: ${err}`);
      }
    });
  })

  // Currently returns before the issues have been processed into the db.
  // TODO: make async.
  return res.sendStatus(200);
});

// Socket IO handlers //

io.origins('*:*') // for latest version
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