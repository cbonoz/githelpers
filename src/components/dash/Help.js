import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import HelpSteps from './../HelpSteps';

export default class Help extends Component {
    render() {
        return (
            <div>
                <div>
                    <ListGroup>
                        <ListGroupItem header={"Getting Started"} bsStyle="info"/>
                        <ListGroupItem>
                            <HelpSteps maxSize={9} />
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        )
    }
}
