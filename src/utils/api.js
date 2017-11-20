const PORT = 9006;

const BASE_URL = `https://githelpers.com`
// const BASE_URL = `http://localhost:${PORT}`;
const GITHUB_URL = `https://api.github.com`;

const axios = require('axios');
const socket = require('socket.io-client')(BASE_URL);
const Cookies = require('universal-cookie');
const cookies = new Cookies();

const MAX_BLOCKS = 8;

function getRepositories() {
    const token = cookies.get('token');
    const username = cookies.get('user')['login']
    const url = `${GITHUB_URL}/users/${username}/repos?access_token=${token}`;
    return axios.get(url).then(response => response.data);
}

function getIssuesForUser(githubName) {
    const url = `${BASE_URL}/api/issues/${githubName}`;
    return axios.get(url).then(response => response.data);
}

function postGithubToken(clientId, clientSecret, code) {
    const url = `${BASE_URL}/api/github`;
    return axios.post(url, {
        clientId: clientId,
        clientSecret: clientSecret,
        code: code
    }).then(response => response.data);
}

function postSearchIssues(query) {
    const url = `${BASE_URL}/api/search`;
    return axios.post(url, {
        query: query,
    }).then(response => response.data);
}

function postIssues(issues, creator) {
    const url = `${BASE_URL}/api/issues`;
    return axios.post(url, {
        issues: issues,
        creator: creator
    }).then(response => response.data);
}

function getSocketEvents(count) {
    if (!count) {
        count = MAX_BLOCKS;
    }
    const url = `${BASE_URL}/api/events/${count}`;
    return axios.get(url).then(response => response.data);
}

function postAccessTokenResults(tokenResponse) {
    const url = "https://api.github.com/user?access_token=" + tokenResponse;
    return axios.get(url).then(response => response);
}

export { MAX_BLOCKS, socket, getIssuesForUser, getRepositories, postGithubToken, postIssues, postSearchIssues, postAccessTokenResults, getSocketEvents, cookies };