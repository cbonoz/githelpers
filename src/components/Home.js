import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactRotatingText from 'react-rotating-text';
import FontAwesome from 'react-fontawesome';

import DataFeed from './data/DataFeed';
import HeaderBox from './data/HeaderBox';
import HelpSteps from './HelpSteps';
import helper from '../utils/helper';

import githelpers from '../assets/githelpers_trans_blue.png';
import bgImage from '../assets/desk_hero_1080.png';

import { socket } from '../utils/api';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // slogan: 'Connect with developers around the world building open source software.'
            slogan: 'Connect with your friends around building great open source software.',
            words: ['building', 'sharing', 'discovering'],
            show: false,
            headerFade: false,
            blocks: []
        }
        this._addEvent = this._addEvent.bind(this);
        this._setUpSocket = this._setUpSocket.bind(this);
    }

    _addEvent(event) {
        event['time'] = helper.formatDateTimeMs(event['time']);
        var newList = [event, ...this.state.blocks];
        if (newList.length > 8) {
            newList = newList.splice(-1,1); // remove last element
        }
        this.setState({ blocks: newList });
    }

    _setUpSocket() {
        const self = this;
        socket.on('connect', function(){
            console.log('connect');
        });

        socket.on('incoming', function(data){
            console.log('incoming', data);
            self._addEvent(data);
        });

        socket.on('disconnect', function(){
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

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true, headerFade: true });
        }, 2000);
    }

    goToLogin() {
        // TODO: take the user to the login route.
        console.log('goToLogin')
    }

    render() {
        const self = this;

        const backgroundStyle = {
            backgroundImage: `url(${bgImage})`,
        };

        return (
            <div className="home-background">
                <div className="home-content">
                    <Row>
                        <Col xs={12} md={9}>
                            <Jumbotron className="jumbotron transparency-jumbotron" style={backgroundStyle}>
                                <div className="static-modal-jumbotron opaque centered">
                                    <img className="home-banner-image" src={githelpers} />
                                    <p className="bold">
                                        Connect with your friends around&nbsp;<ReactRotatingText pause={3000} typingInterval={50} deletingInterval={75} items={self.state.words}/><br/>&nbsp;great open source software.
                                    </p>
                                    {/* <h1>AthenaDelivered</h1> */}

                                    <div className="header-text-section">
                                        <span className="header-text">

                                            <div className="centered">
                                                <p className="centered large">
                                                    What are you waiting for?
                                            </p>
                                                <p><Link to="/faq">
                                                    <Button bsStyle="primary" className="start-button">
                                                       Sign Up 
                                            </Button></Link></p>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </Jumbotron>

                        </Col>
                        <Col xs={12} md={3}>
                            <ListGroup>
                                <HeaderBox header={"Live Activity Feed"}><DataFeed blocks={this.state.blocks} /></HeaderBox>
                            </ListGroup>
                        </Col>
                    </Row>

                </div>

                <HelpSteps maxSize={12}/>

            </div>
        )
    }
}
