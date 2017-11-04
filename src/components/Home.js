import React, { Component } from 'react'
import { Fade, Navbar, Jumbotron, Button, Row, Col, Grid } from 'react-bootstrap';
import ReactRotatingText from 'react-rotating-text';
import helper from '../utils/helper';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: ['Share', 'Learn', 'Code'],
            show: false,
            headerFade: false
        }
    }
    
    componentWillMount() {
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
        return (
            <div>
                <Jumbotron>
                    {/* <ReactRevealText>GitHelpers</ReactRevealText> */}
                    <Fade in={self.state.headerFade}>
                        <h1>GitHelpers</h1>
                    </Fade>
                    {/* <h1>Hello, world!</h1> */}
                        <p>Connect with developers looking to&nbsp;<b><ReactRotatingText items={this.state.words} /></b>&nbsp;together.</p>
                    <p><Button bsStyle="primary">Learn more</Button></p>
                </Jumbotron>

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
                    <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
                </Col>
                <Col xs={12} md={4}>
                    2. Create new issues or take existing ones and tag them with the GitHelpers tag.
                    <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
                </Col>
                <Col xs={12} md={4}>
                    3. Your repos with this tag will automatically be indexed and added to the GitHelpers website, where developers from around the world can search and contribute to repositories explicitly requesting assistance.
                    <code>&lt;{'Col xsHidden md={4}'} /&gt;</code>
                </Col>
                </Row>
            </Grid>

            <div className="centered">
                <p className="centered">
                    What are you waiting for?
                </p>
                <Button onClick={self.goToLogin()}>Let's get Started</Button>
            </div>
            </div>
        )
    }
}
