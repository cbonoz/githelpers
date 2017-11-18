'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const Guid = require('guid');
const pg = require('pg');
const path = require('path');
const { Pool } = require('pg');

const github = require('octonode');
const csrfGuid = Guid.raw();

let globalAccessToken = "";

const connectionString = process.env.GITHELPERS_DATABASE_URL || 'postgres://localhost:5432/githelpers';
const pool = new Pool({
  connectionString: connectionString,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const PORT = 9007;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors());

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

// perform the db search for the passed query -> return a list of active issue results
app.post('/api/search', (req, res) => {
  const body = req.body;
  const query = body.query;
  // TODO: implement search filtering
  // return success back to client once completed.
  const results = [];
  return res.status(200).json(results);
});

// upsert the posted issues to the githelpers db.
app.post('/api/issues', (req, res) => {
  const body = req.body;
  // const issues = JSON.parse(body.issues);

  // TODO: insert issues into DB 'issues' using upsert.
  // return success back to client once completed.

  // Fetching repos and checking for open issues
  const reposUrl = "https://api.github.com/user/repos?access_token=" + globalAccessToken;
  const issuesUrl = "https://api.github.com/user/issues?access_token=" + globalAccessToken;
  // const issues = axios.get(issuesUrl)
  //     .then(function (response) {
  //       console.log('issues response:', response);
  //
  //
  //
  //       pool.query('update issues SET id= ' + response.data.issue, (err, res) => {
  //             console.log('events', err, res);
  //             if (err) {
  //                 return res.status(500).json(err);
  //             }
  //             pool.end()
  //             return res.json(res.rows);
  //       })
  //
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //         console.log('error getting issues from :', error);
  //         return res.json(error);
  //     });


  var client = github.client(globalAccessToken);
  client.get('/user', {}, function (err, status, body, headers) {
      console.log(body.login); //json object
  });

    var ghme           = client.me();
    var ghuser         = client.user('rtre84');
    var ghrepo         = client.repo('rtre84/pipeline');
    // var ghorg          = client.org('flatiron');
    var ghissue        = client.issue('rtre84/pipeline', 3);
    var ghmilestone    = client.milestone('pksunkara/hub', 37);
    var ghlabel        = client.label('pksunkara/hub', 'todo');
    var ghpr           = client.pr('pksunkara/hub', 37);
    var ghrelease      = client.release('pksunkara/hub', 37);
    var ghgist         = client.gist();
    var ghteam         = client.team(37);
    var ghnotification = client.notification(37);

    var ghsearch = client.search();

  // client.get('/repos', {}, function (err, status, body, headers) {
  //     console.log(body); //json object
  // });

  client.get('/user/repos', {}, function (err, status, body, headers){
      body.forEach(function(val) {
          // do things
          console.log(val);
      });
      // console.log("Issues: " + body);

  });

  return res.status(200);
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
io.on('connection', function(client) {
  client.on('action', function(event) {
    pool.query('INSERT INTO events(name, time) values($1, $2)', [event.name, event.time]);
    console.log('action', JSON.stringify(event));
    io.emit('incoming', event)
  });
  client.on('disconnect', function () {
    console.log('user disconnect');
  });
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('postgres connection error', err)
    // TODO: properly handle connection rejection case (stop server).
    console.log('continuing without postgres connection');
  }
})
server.listen(PORT, () => {
  console.log('Listening on localhost:' + PORT);
});