import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import GitHubLogin from 'react-github-login';
import axios from 'axios';

import token from '../utils/token';
import githubIcon from '../assets/github.svg';
import github from '../utils/github';
const onRequest = response => {
    console.log('onRequest', response)
}

const onSuccess = response => {
    console.log('onSuccess', response);
    const data = JSON.parse(response);
    const code = data['code'];
    const clientId = token.githubClientId;
    const secret = token.githubSecret;

    axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        code: code,
        client_secret: secret
      })
      .then(function (response) {
        console.log('token response:', JSON.stringify(response));
        const resp = JSON.parse(response);
        github.initializeWithToken(resp['access_token'])
      })
      .catch(function (error) {
        console.log('error getting access token:', error);
      });
}
const onFailure = response => {
    console.error('onFailure', response);
}

export default class Login extends Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        // https://stackoverflow.com/questions/40407632/how-to-render-a-react-component-using-reactdom-render
        ReactDOM.render(
            <GitHubLogin
                clientId={token.githubClientId}
                redirectUri=""
                scope={token.githubScope}
                onSuccess={onSuccess}
                onFailure={onFailure} />,
            document.getElementById('github-login-button')
        );
    }

    render() {
        return (
            <div>
                <div className="login-area centered">
                    <img src={githubIcon} className="github-logo"/>
                    <div id='github-login-button' />
                </div>
            </div>
        )
    }
}


