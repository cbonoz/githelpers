import React, { Component } from 'react'
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Login from './Login';

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
                        <Modal.Title>Login with Github</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Popover in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                        <h4>Tooltips in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                        <hr />

                        {/* Overflowing text vertically will automatically scroll */}

                        <Login/>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
