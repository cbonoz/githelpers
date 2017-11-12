import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './dash/Search';
import Profile from './dash/Profile';
import Reporting from './dash/Reporting';
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
        socket.emit('action', { name: 'User accessed dashboard', time: Date.now()}, (data) => {
            console.log('action ack', data);
        });
    }

    updateCurrentPage(currentPage) {
        this.setState( {currentPage: currentPage} );
    }

    _renderCurrentPage() {
        switch (this.state.currentPage) {
            case 0:
                return <Search/>; // Search removed on sidebar (will be part of header - no auth required).
            case 1:
                return <Profile/>;
            case 2:
                return <Reporting/>;
            case 3:
                return <Help/>;
        }
    }
    
    render() {
        const self = this;
        return (
            <div>
                <div className='dashboard-container'>
                    <Row>
                        <Col xs={4} md={3}>
                            <Sidebar currentPage={this.state.currentPage} updateCurrentPage={this.updateCurrentPage}/>
                        </Col>
                        <Col xs={8} md={9}>
                            {self._renderCurrentPage()}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
