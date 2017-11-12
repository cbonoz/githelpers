import React, { Component } from 'react'
import {  Button, Row, Col, Grid } from 'react-bootstrap';
import HeaderBox from './data/HeaderBox';

export default class HelpSteps extends Component {
    render() {

        const third = this.props.maxSize / 3;
        const half = this.props.maxSize / 2;

        return (
            <div>

                <Grid className="home-box-grid">
                    <Row className="show-grid">
                        <Col xs={half} md={third}>
                            <div className="home-box-number">1.</div>
                            <HeaderBox header={"Register"}>
                                <div className="centered home-box">
                                    Sign up for a new GitHelpers account using your Github.
                            </div>
                            </HeaderBox>
                        </Col>
                        <Col mdHidden xs={half % 2}></Col>
                        <Col xs={half} md={third}>
                            <div className="home-box-number">2.</div>
                            <HeaderBox header={"Tag"}>
                                <div className="centered home-box">
                                    Create new issues or take existing ones and tag them with the 'githelpers' tag.
                            </div>
                            </HeaderBox>
                        </Col>
                        <Col xs={this.props.maxSize} md={third}>
                            <div className="home-box-number">3.</div>
                            <HeaderBox header={"Discover and Build"}>
                                <div className="centered home-box">
                                    Your repos with this tag will automatically be indexed and added to GitHelpers, where developers from around the world can search and contribute to them.
                                </div>
                            </HeaderBox>
                        </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}
