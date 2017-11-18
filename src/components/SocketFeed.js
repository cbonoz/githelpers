import React, { Component } from 'react'
import DataFeed from './data/DataFeed';
import helper from '../utils/helper';
import { socket } from '../utils/api';

export default class SocketFeed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blocks: []
        }

        this._addEvent = this._addEvent.bind(this);
        this._setUpSocket = this._setUpSocket.bind(this);
    }
   
    
    _addEvent(event) {
        event['time'] = helper.formatDateTimeMs(event['time']);
        var newList = [event, ...this.state.blocks];
        if (newList.length > 8) {
            newList = newList.splice(-1, 1); // remove last element
        }
        this.setState({ blocks: newList });
    }

    _setUpSocket() {
        const self = this;
        socket.on('connect', function () {
            console.log('connect');
        });

        socket.on('incoming', function (data) {
            console.log('incoming', data);
            self._addEvent(data);
        });

        socket.on('disconnect', function () {
            console.log('disconnect');
        });

        socket.open();
    }

    componentWillUnmount() {
        socket.close();
    }

    componentWillMount() {
        const self = this;
        // self._addEvent(helper.exampleEvent);
        self._setUpSocket();
    }
   
    render() {
        return (
            <div>
                    <DataFeed blocks={this.state.blocks} />
            </div>
        )
    }
}
