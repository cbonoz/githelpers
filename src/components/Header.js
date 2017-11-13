import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginModal from './LoginModal';

import githelpers from '../assets/githelpers_trans_white.png';
import { cookies } from '../utils/api';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentUser: cookies.get('user')
        }

        this._logout = this._logout.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    _logout() {
        const self = this;
        console.log('logged out');
        cookies.remove('user');
        console.log('location', window.location);
        window.location = '/';
        self.setState( {currentUser: cookies.get('user')})
    }

    render() {
        const self = this;
        const currentUser = self.state.currentUser;
        return (
            <div>
                {/* <Navbar inverse collapseOnSelect> */}
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to="/">
                                <img className="header-image" src={githelpers} />
                                {/* <a className="white">GitHelpers</a> */}
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {currentUser && <LinkContainer to="/dashboard">
                                <NavItem>Your Profile</NavItem>
                            </LinkContainer>}
                            <LinkContainer to="/search">
                                <NavItem>Search</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/faq">
                                <NavItem>FAQ</NavItem>
                            </LinkContainer>
                            {currentUser && <NavItem onClick={() => self._logout()}>Logout</NavItem>}
                            {!currentUser && <NavItem onClick={() => self.open()}>Login</NavItem>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <LoginModal showModal={this.state.showModal} close={self.close.bind(self)} />
            </div>
        )
    }
}