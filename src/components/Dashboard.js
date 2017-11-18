import React, { Component } from 'react'
import { Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './dash/Search';
import Profile from './dash/Profile';
import UserStatistics from './dash/UserStatistics';
import FeedPage from './dash/FeedPage';
import Help from './dash/Help';
import Sidebar from './dash/Sidebar';

import github from '../utils/github';
import { socket, cookies, getRepositories } from '../utils/api';
import { firebaseAuth } from '../utils/fire';
const GitHub = require('octonode');

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: firebaseAuth.currentUser,
            currentPage: 1
        };

        this._renderCurrentPage = this._renderCurrentPage.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
    }

    updateCurrentPage(currentPage) {
        this.setState({ currentPage: currentPage });
    }

    _renderCurrentPage() {
        switch (this.state.currentPage) {
            // case 0:
            //     return <Search user={this.state.currentUser}/>; // Search removed on sidebar (will be part of header - no auth required).
            case 1:
                return <Profile user={this.state.currentUser}/>
            case 2:
                return <UserStatistics user={this.state.currentUser}/>
            case 3:
                return <FeedPage user={this.state.currentUser}/>
            case 4:
                return <Help user={this.state.currentUser}/>
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
