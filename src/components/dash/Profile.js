import React, { Component } from 'react'
import { Fade, Navbar, Popover, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem, OverlayTrigger } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';

import github from './../../utils/github';
import { socket, postSocketEvent } from './../../utils/api';

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
        // TODO: get synced issues using github (and searching for the 'githelpers' tag)
        const username = "User";
        const event = { name: `${username} just synced issues to the githelpers database`, time: Date.now() };
        socket.emit('action', event, (data) => {
            console.log('action ack', data);
        });
        const gh = github.gh;
        const me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
        me.listRepos(function (err, repos) {
            console.log(err, repos);
            self.setState({ syncing: false });
            if (err) {
                self.setState({ error: err });
                return;
            }
            repos.map((repo) => {
                console.log('repo', JSON.stringify(repo));
                gh.getIssues(self.props.user.login, repo['name']).listIssues().then((response) => {
                    console.log(response.data);
                    const issues = response.data; //.filter((x) => github.isGithelperIssue(x))
                    self.setState({ syncedIssues: self.state.syncedIssues.concat(issues) });
                });
            });
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
                                <h3 className="centered">No synced repositories</h3>}
                            {self.state.error && <h3>Error: {self.state.error.message}</h3>}
                            {!self.state.syncing && self.state.syncedIssues.length > 0 &&
                                <div>
                                    {self.state.syncedIssues.map((issue, index) => {
                                        return (<ListGroupItem className="synced-issue" key={index}>
                                            <div>
                                                {JSON.stringify(issue)}
                                                {/* <h4>{issue.name}</h4>
                                                <a href={issue.url}>Issue Link</a>
                                                <p>Last Updated: {issue.updated_at}</p> */}
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
