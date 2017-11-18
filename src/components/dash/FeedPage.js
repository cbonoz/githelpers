import React, { Component } from 'react'
import SocketFeed from '../SocketFeed';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class FeedPage extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem header={"Live Events"} bsStyle="info"></ListGroupItem>
                    <ListGroupItem>
                        <SocketFeed/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
