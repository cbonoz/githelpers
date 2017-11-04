import React, { Component } from 'react'
import { Button, Collapse, Well } from 'react-bootstrap';

export default class Accordion extends Component {

    constructor(...args) {
        super(...args);
        this.state = { open: false };
    }
    
      render() {
        return (
          <div>
            <Button onClick={() => this.setState({ open: !this.state.open })}>
                {this.props.question}
            </Button>
            <Collapse in={this.state.open}>
              <div>
                <Well>
                    {this.props.children}
                </Well>
              </div>
            </Collapse>
          </div>
        );
      }
}
