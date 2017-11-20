import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import Search from './dash/Search';
import Profile from './dash/Profile';
import UserStatistics from './dash/UserStatistics';
import FeedPage from './dash/FeedPage';
import Help from './dash/Help';
import Sidebar from './dash/Sidebar';

import { firebaseAuth } from '../utils/fire';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentPage: 0
        };

        this._renderCurrentPage = this._renderCurrentPage.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
    }

    componentDidMount() {
        const self = this;
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            self.setState({ currentUser: user });
        })
    }

    componentWillUnmount() {
        this.removeListener();
    }

    updateCurrentPage(currentPage) {
        this.setState({ currentPage: currentPage });
    }

    _renderCurrentPage() {
        const self = this;
        switch (self.state.currentPage) {
            case 0:
                return <Search currentUser={self.state.currentUser} />
            case 1:
                return <Profile currentUser={self.state.currentUser} />
            case 2:
                return <FeedPage currentUser={self.state.currentUser} />
            case 3:
                return <Help currentUser={self.state.currentUser} />
            case 4:
                return <UserStatistics currentUser={self.state.currentUser} />
            default: // 0
                return <Search currentUser={self.state.currentUser} />
        }
    }

    render() {
        const self = this;
        return (
            <div>
                <div className='dashboard-container'>
                    <Row>
                        <Col xs={12} md={3}>
                            <Sidebar currentPage={this.state.currentPage} updateCurrentPage={this.updateCurrentPage} />
                        </Col>
                        <Col xs={12} md={9}>
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
