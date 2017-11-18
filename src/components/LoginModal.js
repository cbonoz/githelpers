import React, { Component } from 'react'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Login from './Login';

import githubIcon from '../assets/github.svg';
import githelpers from '../assets/githelpers_trans_blue.png';

export default class LoginModal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title className="centered">Log into githelpers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div className="centered">
                            <h4>Popover in a modal</h4>
                            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                            <h4>Tooltips in a modal</h4>
                            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
                        </div> */}

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
