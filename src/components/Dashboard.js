import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './dash/Search';
import Sidebar from './dash/Sidebar'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            sidebarOpen: false
        }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        const sidebarContent = <b>Sidebar content</b>;
        return (
            <div>
                <div className='dashboard-container'>
                    <Sidebar sidebar={sidebarContent}
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}>
                        <b>Main content</b>
                    </Sidebar>
                </div>
            </div>
        )
    }
}
