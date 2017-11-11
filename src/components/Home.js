import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactRotatingText from 'react-rotating-text';
import FontAwesome from 'react-fontawesome';

import DataFeed from './data/DataFeed';
import HeaderBox from './data/HeaderBox';
import helper from '../utils/helper';

import githelpers from '../assets/githelpers_trans.png';
import bgImage from '../assets/desk_hero_1080.png';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: ['Share', 'Learn', 'Code'],
            show: false,
            headerFade: false,
            blocks: []
        }
    }

    componentWillMount() {
        const self = this;
        const result = helper.exampleEvent;
        // TODO: replace blocks with http request for recent activity.
        self.setState({ blocks: [result, ...self.state.blocks] })
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
            <div className="home-content">
                <Row>
                    <Col xs={12} md={9}>
                        <Jumbotron className="jumbotron transparency-jumbotron" style={backgroundStyle}>
                            <div className="static-modal-jumbotron opaque centered">
                                <img className="home-banner-image" src={githelpers} />
                                <p>Connect with developers around the world building open source software.</p>
                                {/* <h1>AthenaDelivered</h1> */}

                                <div className="header-text-section">
                                    <span className="header-text">

                                        <div className="centered">
                                            <p className="centered large">
                                                What are you waiting for?
                                            </p>
                                            <p><Link to="/faq">
                                                <Button bsStyle="primary" className="start-button">
                                                    Learn More
                                            </Button></Link></p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </Jumbotron>

                    </Col>
                    <Col xs={12} md={3}>
                        <ListGroup>
                            <HeaderBox header={"Activity Feed"}><DataFeed blocks={this.state.blocks} /></HeaderBox>
                        </ListGroup>
                    </Col>
                </Row>

                <div className="black-divider"/>

                <Grid className="code-grid">
                    <Row className="show-grid">
                        <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                        <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
                        <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
                        <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
                        <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
                    </Row>
                </Grid>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4}>
                            <div className="home-box-number">1.</div>
                            <HeaderBox header={"Register"}>
                                <div className="centered home-box">
                                    Sign up for a new GitHelpers account using your Github.
                            </div>
                            </HeaderBox>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="home-box-number">2.</div>
                            <HeaderBox header={"Tag"}>
                                <div className="centered home-box">
                                    Create new issues or take existing ones and tag them with the GitHelpers tag.
                            </div>
                            </HeaderBox>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="home-box-number">3.</div>
                            <HeaderBox header={"Discover and Build"}>
                                <div className="centered home-box">
                                    Your repos with this tag will automatically be indexed and added to the GitHelpers website, where developers from around the world can search and contribute to repositories explicitly requesting assistance.
                            </div>
                            </HeaderBox>
                        </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}
