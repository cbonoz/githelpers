import React, { Component } from 'react'
import { Jumbotron, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactRotatingText from 'react-rotating-text';
import YouTube from 'react-youtube';

import HeaderBox from './data/HeaderBox';
import HelpSteps from './HelpSteps';
import SocketFeed from './SocketFeed';

import githelpers from '../assets/githelpers_trans_blue.png';
import bgImage from '../assets/desk_hero_1080.png';

import { fbLogin, firebaseAuth } from '../utils/fire';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // slogan: 'Connect with developers around the world building open source software.'
            slogan: 'Connect with your friends around building great open source software.',
            words: ['building', 'sharing', 'discovering'],
            blocks: [],
            authed: this.props.authed
        }
        this._onVideoReady = this._onVideoReady.bind(this);
    }

    _onVideoReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const self = this;
        const videoOpts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        const backgroundStyle = {
            backgroundImage: `url(${bgImage})`,
        };

        return (
            <div className="home-background">
                <div className="home-content">
                    <Row>
                        <Jumbotron className="jumbotron transparency-jumbotron" style={backgroundStyle}>
                            <Col xs={12} md={8}>
                                <div className="static-modal-jumbotron opaque centered">
                                    <img className="home-banner-image" src={githelpers} />
                                    <p className="bold slogan-text">
                                        Connect with your friends while&nbsp;
                                        <ReactRotatingText pause={3000} typingInterval={50} deletingInterval={75} items={self.state.words}/><br/>
                                        great open source software.
                                        {/* {self.state.slogan} */}
                                    </p>
                                    <div className="header-text-section">
                                        <span className="header-text">
                                            <div className="centered">
                                                <p className="centered large bold">
                                                    What are you waiting for?<br />
                                                </p>
                                                <Button bsStyle="primary" className="start-button" onClick={() => fbLogin()}>
                                                    Start Building
                                                    &nbsp;<i className="centered clear fa fa-paper-plane " aria-hidden="true"></i>
                                                </Button>
                                                <Link to="/faq">
                                                    <p className="home-learn-more">See our FAQ</p>
                                                </Link>
                                            </div>
                                        </span>
                                    </div>

                                </div>
                            </Col>
                            <Col xs={12} md={3} className="home-right-col">
                                <ListGroup>
                                    <HeaderBox header={"Recent Activity"}>
                                        <SocketFeed />
                                    </HeaderBox>
                                </ListGroup>
                            </Col>
                            <Col xsHidden md={1} />
                        </Jumbotron>
                    </Row>
                </div>
                <Row>
                    <Col xs={12} md={12}>
                        <div className="home-video-section centered">
                            <h1 className='facebook-blue centered home-video-heading'>How it Works</h1>
                            {/* <YouTube
                                videoId="2g811Eo7K8U"
                                opts={videoOpts}
                                onVideoReady={this._onVideoReady}
                            /> */}
                        </div>
                    </Col>
                </Row>
                <HelpSteps maxSize={12} />
            </div>
        )
    }
}
