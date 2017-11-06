import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <div>
                {/* <Navbar inverse collapseOnSelect> */}
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to="/">
                                <a className="white">GitHelpers</a>
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to="/faq">
                                <NavItem>FAQ</NavItem>
                            </LinkContainer>
                            {/* TODO: show logout or login depending on auth state. */}
                            <LinkContainer to="/login">
                                <NavItem>Login / Sign Up</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}