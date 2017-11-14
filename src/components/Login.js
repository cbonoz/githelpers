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
                    console.log('access token response data', tokenResponse, res.data);

                    // store session in cookies.
                    cookies.set('user', res.data, { path: '/' });
                    github.client.token = tokenResponse;
                    // cookies.set('token', tokenResponse, { path: '/' });

                    socket.emit('action', { name: `${res.data['login']} just logged in`, time: Date.now() }, (data) => {
                        console.log('action ack', data);
                    });
                    self.props.onLogin();
                    // console.log(github.gh)
                    github.gh.__auth.token = tokenResponse;
                    window.location = '/dashboard';
                    return res.data;
                });
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


