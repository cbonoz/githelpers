'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');

const PORT = 9007;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/hello', (req, res) => {
  return res.json("hello world");
});

const server = require('https').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (client) {
  client.on('event', function (data) { 
    console.log('event', event);

  });

  client.on('disconnect', function () { 
    console.log('disconnect', event);
  });
});

// app.get('/api/hello', (req, res) => {
//   return res.json("hello world");
// });

app.listen(PORT, () => {
  console.log('Listening on localhost:' + PORT);
});