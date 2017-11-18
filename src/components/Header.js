import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import githelpers from '../assets/githelpers_trans_blue.png';
import { firebaseAuth, fbLogin } from '../utils/fire';
import firebase from 'firebase';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
        this._login = this._login.bind(this);
    }
d
    _login() {
        fbLogin()
    }

    _logout() {
        firebaseAuth().signOut();
    }

    render() {
        const self = this;
        const authed = self.props.authed;
        const currentUser = firebase.auth().currentUser;
        return (
            <div className="border-bottom-blue">
                {/* <Navbar inverse collapseOnSelect> */}
                <Navbar>
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
                            {authed && <LinkContainer to='/dashboard'>
                                <img className="header-image" src={currentUser.photoURL}/>
                            </LinkContainer>}
                        <Nav pullRight>
                                {authed && <LinkContainer to="/dashboard"><NavItem>Your Dashboard</NavItem></LinkContainer>}
                                
                            <LinkContainer to="/search">
                                <NavItem>Discover Projects</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/faq">
                                <NavItem>FAQ</NavItem>
                            </LinkContainer>
                            {authed && <NavItem onClick={() => self._logout()}>Logout</NavItem>}
                            {!authed && <NavItem onClick={() => self._login()}>Login&nbsp;&nbsp;
                            <i className="centered clear fa fa-facebook-official facebook-blue" aria-hidden="true"></i>
                            </NavItem>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}