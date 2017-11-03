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
            </div>
        )
    }
}
