import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class UserStatistics extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // TODO: replace with dynamic message.
            statMessage: "Sync your first issue to see statistics here"
        }
    }
    

    componentWillMount() {

    }

    render() {
        const self = this;
        return (
            <div>
                <ListGroup>
                    <ListGroupItem
                        header={"User Statistics"}>
                    </ListGroupItem>
                    <ListGroupItem className="group-padding">
                        <p className="stats-text">{self.state.statMessage}</p>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
