const PORT = 9007;
const BASE_URL = `http://localhost:${PORT}`;

const axios = require('axios');
const socket = require('socket.io-client')(BASE_URL);

function getFoodData() {
  const url = `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(response => response.data);
}

function postGithubToken(clientId, clientSecret, code) {
    const url = `${BASE_URL}/api/github/`;
    return axios.post(url,  {
        clientId: clientId,
        clientSecret: clientSecret,
        code: code
      }).then(response => response.data);
  }

export {getFoodData, socket, postGithubToken};