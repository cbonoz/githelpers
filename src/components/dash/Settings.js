import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Form} from 'react-bootstrap';


export default class Settings extends Component {

    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem header={"Settings"} bsStyle="danger" />
                    <ListGroupItem>
                        <Form>
                            <p>Enter your github username</p>

                        </Form>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
