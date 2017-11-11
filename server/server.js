'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 9007;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/hello', (req, res) => {
  return res.json("hello world");
});

// app.get('/api/hello', (req, res) => {
//   return res.json("hello world");
// });

app.listen(PORT, () => {
  console.log('Listening on localhost:' + PORT);
});