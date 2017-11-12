import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './dash/Search';
import Profile from './dash/Profile';
import UserStatistics from './dash/UserStatistics';
import Help from './dash/Help';
import Sidebar from './dash/Sidebar';

import github from '../utils/github';
import token from '../utils/token';
import { socket } from '../utils/api';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            currentPage: 1
        };

        this._renderCurrentPage = this._renderCurrentPage.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
    }

    componentWillMount() {

    }

    updateCurrentPage(currentPage) {
        this.setState({ currentPage: currentPage });
    }

    _renderCurrentPage() {
        switch (this.state.currentPage) {
            case 0:
                return <Search />; // Search removed on sidebar (will be part of header - no auth required).
            case 1:
                return <Profile />;
            case 2:
                return <UserStatistics />;
            case 3:
                return <Help />;
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
