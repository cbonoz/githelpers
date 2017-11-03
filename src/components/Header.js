import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import LoginModal from './LoginModal';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        
    }
    showModal() {
        this.setState({ show: true });
    }

    hideModal() {
        this.setState({ show: false });
    }

    render() {
        const self = this;

        return (
          <div className="App">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">GitHelpers</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem href="/about">About</NavItem>
                  <NavItem href="/signup">Signup</NavItem>
                  <NavItem href="/login" onClick={this.showModal}>Login</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {/* <Routes /> */}

            <LoginModal show={self.state.show} hideModal={self.hideModal.bind(this)}/>
          </div>
        );
    }
}
