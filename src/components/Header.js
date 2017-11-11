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
            showModal: false
        }
    }

    close() {
        this.setState({ showModal: false });
      }
    
      open() {
        this.setState({ showModal: true });
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
                            <LinkContainer to="/faq">
                                <NavItem>FAQ</NavItem>
                            </LinkContainer>
                            {/* TODO: show logout or login depending on auth state. */}
                            {/* <LinkContainer to="/login"> */}
                                <NavItem onClick={() => self.open()}>Login</NavItem>
                            {/* </LinkContainer> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <LoginModal showModal={this.state.showModal} close={self.close.bind(self)}/>
            </div>
        )
    }
}