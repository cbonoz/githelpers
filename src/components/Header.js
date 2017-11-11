import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginModal from './LoginModal';

import githelpers from '../assets/githelpers_trans_white.png';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loggedIn: true
        }
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    logout() {
        console.log('logged out');
        // TODO: implement by clearing the github auth token from store.
    }

    render() {
        const self = this;
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
                            {this.state.loggedIn && <LinkContainer to="/dashboard">
                                <NavItem>Dashboard</NavItem>
                            </LinkContainer>}
                            <LinkContainer to="/faq">
                                <NavItem>FAQ</NavItem>
                            </LinkContainer>
                            {this.state.loggedIn && <NavItem onClick={() => self.logout()}>Logout</NavItem>}
                            {!this.state.loggedIn && <NavItem onClick={() => self.open()}>Login</NavItem>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <LoginModal showModal={this.state.showModal} close={self.close.bind(self)} />
            </div>
        )
    }
}