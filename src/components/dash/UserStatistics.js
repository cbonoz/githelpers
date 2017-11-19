import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import github from './../../utils/github';
import { cookies } from './../../utils/api';

export default class UserStatistics extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // TODO: replace with dynamic message.
            statMessage: "Sync your first issue to see statistics here"
        }
    }

    render() {
        const self = this;
        const currentUser = self.props.currentUser;
        return (
            <div>
                <ListGroup>
                    {/* <ListGroupItem header={"User Statistics"} bsStyle="info"/>
                    <ListGroupItem className="group-padding">
                        <p className="stats-text">{self.state.statMessage}</p>
                    </ListGroupItem> */}
                    <ListGroupItem header={"User Information"} bsStyle="info"/>
                    {currentUser && <ListGroupItem>
                        {/* <p>{JSON.stringify(currentUser)}</p> */}
                        {/* <h4>Account:</h4> */}
                        <img src={currentUser.photoURL}/>
                            <h5>Name: {currentUser.displayName}</h5>
                            <h5>Email: {currentUser.email}</h5>
                            {currentUser.phoneNumber && <h5>Phone: {currentUser.phoneNumber}</h5>}
                        </ListGroupItem>}
                </ListGroup>
            </div>
        )
    }
}
