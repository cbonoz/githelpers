import React, { Component } from 'react'
import { Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './dash/Search';
import Profile from './dash/Profile';
import UserStatistics from './dash/UserStatistics';
import Help from './dash/Help';
import Sidebar from './dash/Sidebar';

import github from '../utils/github';
import token from '../utils/token';
import { socket, cookies, getRepositories } from '../utils/api';
const GitHub = require('octonode');

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentPage: 1,
            githubClient: null
        };

        this._renderCurrentPage = this._renderCurrentPage.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
    }

    componentWillMount() {
        // getRepositories().then((err, data) => {
        //     console.log('getRepos', err, data);
        // }).catch((err) => {
        //     console.error(err);
        // })
        const user = cookies.get('user');
        const token = cookies.get('token');
        console.log('user', user)
        console.log('token', token)
        this.setState( {currentUser: user, githubClient: GitHub.client(token)});
        console.log(this.state.currentUser);
    }

    updateCurrentPage(currentPage) {
        this.setState({ currentPage: currentPage });
    }

    _renderCurrentPage() {
        switch (this.state.currentPage) {
            case 0:
                return <Search user={this.state.currentUser} client={this.state.githubClient}/>; // Search removed on sidebar (will be part of header - no auth required).
            case 1:
                return <Profile user={this.state.currentUser} client={this.state.githubClient}/>;
            case 2:
                return <UserStatistics user={this.state.currentUser} client={this.state.githubClient}/>;
            case 3:
                return <Help user={this.state.currentUser} client={this.state.githubClient}/>;
        }
    }

    render() {
        const self = this;
        return (
            <div>
                <div className='dashboard-container'>
                    <Row>
                        <Col xs={4} md={3}>
                            <Sidebar currentPage={this.state.currentPage} updateCurrentPage={this.updateCurrentPage} />
                        </Col>
                        <Col xs={8} md={9}>
                            <div className="full-height">
                                {self._renderCurrentPage()}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
