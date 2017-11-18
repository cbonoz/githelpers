import React, { Component } from 'react'
import { Button, Modal,  } from 'react-bootstrap';
import Login from './Login';

import githubIcon from '../assets/github.svg';
import githelpers from '../assets/githelpers_trans_blue.png';

export default class LoginModal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title className="centered">Log into githelpers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <hr />
                        {/* Overflowing text vertically will automatically scroll */}
                        <div className="centered">
                            <img src={githelpers} className="header-image centered login-image"/>
                            <Login onLogin={this.props.close}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
