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
                <div className="home-content">

                {/* <div id="page-wrapper"> */}

                    <section id="banner">
                        <div className="content">
                            <header>
                                <h2>GitHelpers</h2>
                                <p>GitHelpers is a platform for sharing and discovering open source projects<br/>
                                    that need your help.</p>
                                <button className="get-started-button">Get Started</button>
                            </header>
                            <span className="image">
                                <img src={require("../images/pic05.jpg")} alt="" className="vocal-ball" /></span>
                        </div>
                        <a href="#one" className="goto-next scrolly">Next</a>
                    </section>

                    <section id="one" className="spotlight style1 bottom">
                        <span className="image fit main"><img src="images/pic02.jpg" alt="" /></span>
                        <div className="content">
                            <div className="container">
                                <div className="row">
                                    <div className="4u 12u$(medium)">
                                        <header>
                                            <h2>Odio faucibus ipsum integer consequat</h2>
                                            <p>Nascetur eu nibh vestibulum amet gravida nascetur praesent</p>
                                        </header>
                                    </div>
                                    <div className="4u 12u$(medium)">
                                        <p>Feugiat accumsan lorem eu ac lorem amet sed accumsan donec.
                                Blandit orci porttitor semper. Arcu phasellus tortor enim mi
                                nisi praesent dolor adipiscing. Integer mi sed nascetur cep aliquet
                                augue varius tempus lobortis porttitor accumsan consequat
                                adipiscing lorem dolor.</p>
                                    </div>
                                    <div className="4u$ 12u$(medium)">
                                        <p>Morbi enim nascetur et placerat lorem sed iaculis neque ante
                                adipiscing adipiscing metus massa. Blandit orci porttitor semper.
                                Arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer
                                mi sed nascetur cep aliquet augue varius tempus. Feugiat lorem
                                ipsum dolor nullam.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="#two" className="goto-next scrolly">Next</a>
                    </section>

                    <section id="two" className="spotlight style2 right">
                        <span className="image fit main"><img src="images/pic03.jpg" alt="" /></span>
                        <div className="content">
                            <header>
                                <h2>Interdum amet non magna accumsan</h2>
                                <p>Nunc commodo accumsan eget id nisi eu col volutpat magna</p>
                            </header>
                            <p>Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis porttitor lorem et accumsan consequat adipiscing lorem.</p>
                            <ul className="actions">
                                <li><a href="#" className="button">Learn More</a></li>
                            </ul>
                        </div>
                        <a href="#three" className="goto-next scrolly">Next</a>
                    </section>

                    <section id="three" className="spotlight style3 left">
                        <span className="image fit main bottom"><img src="images/pic04.jpg" alt="" /></span>
                        <div className="content">
                            <header>
                                <h2>Interdum felis blandit praesent sed augue</h2>
                                <p>Accumsan integer ultricies aliquam vel massa sapien phasellus</p>
                            </header>
                            <p>Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis porttitor lorem et accumsan consequat adipiscing lorem.</p>
                            <ul className="actions">
                                <li><a href="#" className="button">Learn More</a></li>
                            </ul>
                        </div>
                        <a href="#four" className="goto-next scrolly">Next</a>
                    </section>

                    <section id="four" className="wrapper style1 special fade-up">
                        <div className="container">
                            <header className="major">
                                <h2>Accumsan sed tempus adipiscing blandit</h2>
                                <p>Iaculis ac volutpat vis non enim gravida nisi faucibus posuere arcu consequat</p>
                            </header>
                            <div className="box alt">
                                <div className="row uniform">
                                    <section className="4u 6u(medium) 12u$(xsmall)">
                                        <span className="icon alt major fa-area-chart"></span>
                                        <h3>Ipsum sed commodo</h3>
                                        <p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
                                    </section>
                                    <section className="4u 6u$(medium) 12u$(xsmall)">
                                        <span className="icon alt major fa-comment"></span>
                                        <h3>Eleifend lorem ornare</h3>
                                        <p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
                                    </section>
                                    <section className="4u$ 6u(medium) 12u$(xsmall)">
                                        <span className="icon alt major fa-flask"></span>
                                        <h3>Cubilia cep lobortis</h3>
                                        <p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
                                    </section>
                                    <section className="4u 6u$(medium) 12u$(xsmall)">
                                        <span className="icon alt major fa-paper-plane"></span>
                                        <h3>Non semper interdum</h3>
                                        <p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
                                    </section>
                                    <section className="4u 6u(medium) 12u$(xsmall)">
                                        <span className="icon alt major fa-file"></span>
                                        <h3>Odio laoreet accumsan</h3>
                                        <p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
                                    </section>
                                    <section className="4u$ 6u$(medium) 12u$(xsmall)">
                                        <span className="icon alt major fa-lock"></span>
                                        <h3>Secured by Blockchain</h3>
                                        <p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
                                    </section>
                                </div>
                            </div>
                            <footer className="major">
                                <ul className="actions">
                                    <li><a href="#" className="button">FAQ</a></li>
                                </ul>
                            </footer>
                        </div>
                    </section>

                    <section id="five" className="wrapper style2 special fade">
                        <div className="container">
                            <header>
                                <h2>Stay in touch</h2>
                                <p>Give us your email to stay up to date with the latest Vocal news.</p>
                            </header>
                            <form method="post" action="#" className="container 50%">
                                <div className="row uniform 50%">
                                    <div className="8u 12u$(xsmall)"><input type="email" name="email" id="email" placeholder="Your Email Address" /></div>
                                    <div className="4u$ 12u$(xsmall)"><input type="submit" value="Subscribe" className="fit special" /></div>
                                </div>
                            </form>
                        </div>
                    </section>

                    <footer id="footer">
                        <ul className="icons">
                            <li><a href="#" target="_blank" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
                            <li><a href="#" target="_blank" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                            <li><a href="#" target="_blank" className="icon alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
                            <li><a href="#" target="_blank" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                            <li><a href="#" target="_blank" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
                            <li><a href="#" target="_blank" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
                        </ul>
                        <ul className="copyright">
                            <li>&copy;2017 Vocal Token. All rights reserved.</li>
                        </ul>
                    </footer>

                </div>
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
                </Col>
                <Col xs={12} md={4}>
                    2. Create new issues or take existing ones and tag them with the GitHelpers tag.
                </Col>
                <Col xs={12} md={4}>
                    3. Your repos with this tag will automatically be indexed and added to the GitHelpers website, where developers from around the world can search and contribute to repositories explicitly requesting assistance.
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
