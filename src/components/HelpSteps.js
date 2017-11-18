import React, { Component } from 'react'
import {  Button, Row, Col, Grid } from 'react-bootstrap';
import HeaderBox from './data/HeaderBox';
import FontAwesome from 'react-fontawesome';

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
                                    Sign up for a new GitHelpers account using your facebook account.<br/>
                                    <i class="centered clear fa fa-4x fa-facebook-square help-icon" aria-hidden="true"></i>
                            </div>
                            </HeaderBox>
                        </Col>
                        <Col mdHidden xs={half % 2}></Col>
                        <Col xs={half} md={third}>
                            <div className="home-box-number">2.</div>
                            <HeaderBox header={"Tag"}>
                                <div className="centered home-box">
                                    Create new issues or take existing ones and tag them with the 'githelpers' tag.
                                    <i class="centered clear fa fa-4x fa-tag help-icon" aria-hidden="true"></i>
                            </div>
                            </HeaderBox>
                        </Col>
                        <Col xs={this.props.maxSize} md={third}>
                            <div className="home-box-number">3.</div>
                            <HeaderBox header={"Discover and Build"}>
                                <div className="centered home-box">
                                    With a single click, your tagged issues be indexed and added to our DB.
                                    <i class="centered clear fa fa-4x fa-database help-icon" aria-hidden="true"></i>
                                </div>
                            </HeaderBox>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={this.props.maxSize} md={this.props.maxSize}>
                            <p className="centered home-bottom-text bold">That's it. Developers from around the world can now search for and contribute to these issues.</p>
                        </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}
