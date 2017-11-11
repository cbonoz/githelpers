import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import GitHubLogin from 'react-github-login';
import token from '../utils/token';

const onSuccess = response => {
    console.log('onSuccess', response);
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
            <GitHubLogin clientId={token.githubClientId}
                redirectUri={token.githubRedirectUrl}
                onSuccess={onSuccess}
                onFailure={onFailure} />,
            document.getElementById('github-login-button')
        );
    }


    render() {
        return (
            <div>
                <div className="login-area">
                    <div id='github-login-button' />
                </div>
            </div>
        )
    }
}


