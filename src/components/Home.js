import React, { Component } from 'react'
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import ReactRotatingText from 'react-rotating-text';
import helper from '../utils/helper';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: ['Share', 'Learn', 'Code']
        }
    }
    
    componentWillMount() {
    }

    setNewWord() {

    }
    
    render() {
        const self = this;
        return (
            <div>
                <Jumbotron>
                    <h1>Hello, world!</h1>
                        <p>Connect with developers looking to&nbsp;<b><ReactRotatingText items={this.state.words} /></b>&nbsp;together.</p>
                    <p><Button bsStyle="primary">Learn more</Button></p>
                </Jumbotron>
            </div>
        )
    }
}
