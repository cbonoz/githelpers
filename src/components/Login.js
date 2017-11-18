import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import GitHubLogin from 'react-github-login';
import AccountKit from 'react-facebook-account-kit';
import axios from 'axios';
import firebase from 'firebase';
import { provider, fbLogin } from '../utils/fire';

import { cookies, postGithubToken, postAccessTokenResults, socket } from '../utils/api';

// import githubIcon from '../assets/github.svg';
import github from '../utils/github';

const onRequest = response => {
    console.log('onRequest', response)
}

export default class Login extends Component {

    constructor(props) {
        super(props)
        this._fbLogin = this._fbLogin.bind(this);
    }

    componentWillMount() {
        console.log('appId', process.env.REACT_APP_FB_APP_ID)
    }

    _fbLogin() {
        fbLogin();
    }

    render() {
        const self = this;
        return (
            <div>
                <div className="login-area centered">
                    {/* <img src={githubIcon} className="github-logo" /> */}
                    {/* <div id='github-login-button' /> */}
                    {/* <div id='facebook-login-button' /> */}
                    <i className="centered clear fa fa-5x fa-facebook-official facebook-blue" aria-hidden="true"></i><br/>
                    <Button className="facebook-login-button" bsStyle="info" bsSize="large" onClick={self._fbLogin}>Login with Facebook</Button>
                </div>
            </div>
        )
    }
}


