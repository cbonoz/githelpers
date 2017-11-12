'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');

const PORT = 9007;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors());

app.get('/api/hello', (req, res) => {
  return res.json("hello world");
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
  })
  .then(function (response) {
    // console.log('token response:', JSON.stringify(response));
    console.log('token response:', response.data);
    // const resp = JSON.parse(response);
    const resp = response.data;
    const respArray = resp.split("&");
    const accessToken = respArray[0].split("=");

    // Returns received Access Token
    return res.json(accessToken[1]);
  })
  .catch(function (error) {
    console.log('error getting access token from :', error);
    return res.json(error);
  });
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (client) {

  client.on('action', function (data) { 
    console.log('action', JSON.stringify(data));
    io.emit('incoming', data)
  });

  client.on('disconnect', function () { 
    console.log('disconnect');
  });
});

server.listen(PORT, () => {
  console.log('Listening on localhost:' + PORT);
});