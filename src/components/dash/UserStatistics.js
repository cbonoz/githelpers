import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { cookies } from './../../utils/api';

export default class UserStatistics extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // TODO: replace with dynamic message.
            statMessage: "Sync your first issue to see statistics here",
            user: cookies.get('user')
        }
        this._printProfile = this._printProfile.bind(this);
    }

    render() {
        const self = this;
        return (
            <div>
                <ListGroup>
                    <ListGroupItem header={"User Statistics"} />
                    <ListGroupItem className="group-padding">
                        <p className="stats-text">{self.state.statMessage}</p>
                    </ListGroupItem>
                    <ListGroupItem header={"Account"} />
                    <ListGroupItem>
                        {self.state.user && <ul>
                            {Object.keys(self.state.user).map((key, index) => {
                                return <li key={index}><b>{key}:</b>&nbsp;{JSON.stringify(self.state.user[key])}</li>
                            })}
                        </ul>}
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
