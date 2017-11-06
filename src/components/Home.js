import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactRotatingText from 'react-rotating-text';
import FontAwesome from 'react-fontawesome';
import helper from '../utils/helper';

import githelpers from '../assets/githelpers_trans.png';
import bgImage from '../assets/desk_hero_1080.png';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: ['Share', 'Learn', 'Code'],
            show: false,
            headerFade: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true, headerFade: true });
        }, 2000);
    }

    goToLogin() {
        console.log('goToLogin')
        // TODO: take the user to the login route.
    }

    render() {
        const self = this;

        const backgroundStyle = {
            backgroundImage: `url(${bgImage})`,
        };

        return (
            <div className="home-content">
                <Row>
                    <Col xs={12} md={12}>
                        <Jumbotron className="jumbotron transparency-jumbotron" style={backgroundStyle}>
                            <div className="static-modal-jumbotron opaque centered">
                                <img className="header-image" src={githelpers} />
                                {/* <h1>AthenaDelivered</h1> */}

                                <div className="header-text-section">
                                    <span className="header-text">

                                        <div className="centered">
                                            <p className="centered">
                                                What are you waiting for?
                                                <FontAwesome
                                                    className='super-crazy-colors'
                                                    name='rocket'
                                                    size='2x'
                                                    spin
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                            </p>
                                            <p><Link to="/login">
                                            <Button onClick={self.goToLogin()} bsStyle="primary" className="start-button">
                                                Let's get started
                                            </Button></Link></p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </Jumbotron>

                    </Col>
                </Row>

                <Grid>
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
                            1. Sign up for a new GitHelpers account using your Github.
                </Col>
                        <Col xs={12} md={4}>
                            2. Create new issues or take existing ones and tag them with the GitHelpers tag.
                </Col>
                        <Col xs={12} md={4}>
                            3. Your repos with this tag will automatically be indexed and added to the GitHelpers website, where developers from around the world can search and contribute to repositories explicitly requesting assistance.
                </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}
