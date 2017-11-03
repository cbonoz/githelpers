import React, { Component } from 'react'
import ReactRotatingText from 'react-rotating-text';
import helper from '../utils/helper';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: ['Sharing', 'Learning', 'Coding']
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
                Connect with developers: <br/>
                <ReactRotatingText items={this.state.words} />
            </div>
        )
    }
}
