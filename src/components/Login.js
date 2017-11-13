import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import GitHubLogin from 'react-github-login';
import axios from 'axios';

import { cookies, postGithubToken, postAccessTokenResults, socket } from '../utils/api';

import token from '../utils/token';
import githubIcon from '../assets/github.svg';
import github from '../utils/github';

const onRequest = response => {
    console.log('onRequest', response)
}

export default class Login extends Component {

    constructor(props) {
        super(props)
        this._onSuccess = this._onSuccess.bind(this);
        this._onFailure = this._onFailure.bind(this);
    }

    _onSuccess(response) {
        const self = this;
        console.log('onSuccess', response);
        const clientId = token.githubClientId;
        const secret = token.githubSecret;
        const code = response['code'];

        postGithubToken(clientId, secret, code)
            .then(function (tokenResponse) {
                console.log('token response:', JSON.stringify(tokenResponse));
                github.initializeWithToken(tokenResponse);

                // TODO: replace username with github acc name.
                // const username = "User";
                // socket.emit('action', { name: `${username} just logged in with Github`, time: Date.now()}, (data) => {
                //     console.log('action ack', data);
                // });

                return tokenResponse;
            })
            .then(function (tokenResponse) {
                console.log("2nd tokenResponse: " + tokenResponse);

                // Need to use access token to fetch info from github. Should hit another server url that fetches the results finally.
                // postAccessTokenResults(tokenResponse)
                // const githubProfileResults = postAccessTokenResults(tokenResponse);
                const url = "https://api.github.com/user?access_token=" + tokenResponse;
                axios.get(url).then(function (res) {
                    console.log('access token response data', res.data);

                    // Horrible idea but making it global for now
                    window.githubProfileResults = res.data;

                    cookies.set('user', res.data, { path: '/' });
                    socket.emit('action', { name: `${res.data['login']} just logged in`, time: Date.now() }, (data) => {
                        console.log('action ack', data);
                    });
                    self.props.onLogin();
                    return res.data;
                });

                return window.githubProfileResults;
            })
            .catch(function (error) {
                console.log('error getting access token:', error);
            });
    }

    _onFailure(response) {
        console.error('onFailure', response);
    }


    componentDidMount() {
        // https://stackoverflow.com/questions/40407632/how-to-render-a-react-component-using-reactdom-render
        ReactDOM.render(
            <GitHubLogin
                clientId={token.githubClientId}
                redirectUri=""
                scope={token.githubScope}
                onSuccess={this._onSuccess}
                onFailure={this._onFailure} />,
            document.getElementById('github-login-button')
        );
    }

    render() {
        return (
            <div>
                <div className="login-area centered">
                    <img src={githubIcon} className="github-logo" />
                    <div id='github-login-button' />
                </div>
            </div>
        )
    }
}


