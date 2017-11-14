import React, { Component } from 'react'
import { Fade, Navbar, Popover, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem, OverlayTrigger } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';

import github from './../../utils/github';
import { cookies, socket, postSocketEvent } from './../../utils/api';

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // issues synced with the githelpers DB (and are currently indexed for public search and discovery).
            syncedIssues: [],
            syncing: false,
            error: null
        }
    }

    componentWillMount() {
        // console.log('gh token', gh.__auth.token);
        // TODO: fetch user statistics from server.
        // var clayreimann = gh.getUser('clayreimann');
        // clayreimann.listStarredIssues(function(err, issues) {
        //    // look at all the starred issues!
        // });

        // this._syncIssues()
    }

    _renderIssue(issue) {
        return (
            <div>
                <h4>{issue.name}</h4>

                <a href={issue.url}>Issue Link</a>
                <p>Last Updated: {issue.updated_at}</p>
            </div>
        )

    }

    // TODO: prevent user from repeatedly spanning syncIssues button and web request.
    _syncIssues() {
        const self = this;
        self.setState({ syncing: true, syncedIssues: [], error: null });
        console.log('syncing issues for user');
        const username = this.props.user.login;
        const event = { name: `${username} just synced issues to the githelpers database`, time: Date.now() };
        socket.emit('action', event, (data) => {
            console.log('action ack', data);
        });

        const client = this.props.client;
        console.log(JSON.stringify(client));
        var ghme = client.me();

        ghme.issues({
            page: 2,
            per_page: 100,
            filter: 'all',
            state: 'open',
            labels: 'githelpers',
            sort: 'created'
        }, function (err, res, body, headers) {
            console.log(err, res, body, headers); //json object
            self.setState({syncing: false})
            if (err) {
                self.setState( {error: err});
                return;
            }
            self.setState( {syncedIssues: res })
        });
    }

    render() {
        const self = this;

        const popover = (
            <Popover id="modal-popover" title="Refresh Issues">
                Clicking here will scan your repositories for new issues tagged with 'githelpers' and sync them to the githelpers database. These will appear below.
            </Popover>
        );

        return (
            <div className="profile-content">
                <ListGroup>
                    <ListGroupItem header={"Your Profile: " + self.props.user.login} bsStyle="info"></ListGroupItem>
                    <ListGroupItem>
                        <OverlayTrigger overlay={popover}>
                            <Button className="refresh-button" type="submit" bsStyle="danger" bsSize="large" onClick={() => self._syncIssues()}>Refresh tagged issues</Button>
                        </OverlayTrigger>
                    </ListGroupItem>

                    {/* <ListGroup> */}
                    <div className="sync-results">
                        <ListGroupItem header={"Your current tagged issues:"} />
                        <div className="syncing">
                            <ClimbingBoxLoader className="centered" color={'#123abc'} size={500} loading={self.state.syncing} />
                        </div>
                        <div className="synced-issues">
                            {!self.state.syncing && !self.state.error && self.state.syncedIssues.length == 0 &&
                                <h3 className="centered">No synced 'githelpers' issues</h3>}
                            {self.state.error && <h3>Error: {self.state.error.message}</h3>}
                            {!self.state.syncing && self.state.syncedIssues.length > 0 &&
                                <div>
                                    {self.state.syncedIssues.map((issue, index) => {
                                        return (<ListGroupItem className="synced-issue" key={index}>
                                            <div>
                                                <h4>{issue.title}</h4>
                                                <a href={issue.html_url}>Github Issue Link</a>
                                                <p>Body: {issue.body}</p>
                                                <p>Last Updated: {issue.updated_at}</p>
                                            </div>
                                        </ListGroupItem>)
                                    })}
                                </div>
                            }
                        </div>
                    </div>

                </ListGroup>
            </div>
        )
    }
}
