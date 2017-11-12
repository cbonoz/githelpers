import React, { Component } from 'react'
import { Fade, Navbar, Popover, Jumbotron, Button, Row, Col, Grid, ListGroup, ListGroupItem, OverlayTrigger } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';

import { gh } from './../../utils/github';
import { socket } from './../../utils/api';

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // issues synced with the githelpers DB (and are currently indexed for public search and discovery).
            syncedIssues: [],
            syncing: false
        }
    }

    componentWillMount() {
        console.log('gh', gh);
        // TODO: fetch user statistics from server.
        // var clayreimann = gh.getUser('clayreimann');
        // clayreimann.listStarredIssues(function(err, issues) {
        //    // look at all the starred issues!
        // });

        // _syncIssues()
    }

    _syncIssues() {
        const self = this;
        self.setState({ syncing: true });
        console.log('syncing issues for user');
        // TODO: get synced issues using github (and searching for the 'githelpers' tag)
        const username = "User";
        socket.emit('action', { name: `${username} just synced issues to the githelpers database`, time: Date.now()}, (data) => {
            console.log('action ack', data);
        });

    }

    render() {
        const self = this;

        const popover = (
            <Popover id="modal-popover" title="popover">
                Clicking here will scan your repositories for new issues tagged with 'githelpers' and sync them to the githelpers database.
            </Popover>
        );

        return (
            <div className="profile-content">
                <div className="centered">
                    <h1>Profile</h1>

                    <OverlayTrigger overlay={popover}>
                        <Button type="submit" onClick={() => self._syncIssues()}>Refresh tagged issues</Button>
                    </OverlayTrigger>

                </div>

                <hr />

                <p className="centered">Your current tagged issues:</p>

                <div className="sync-results">

                    <div className="syncing">
                        <ClimbingBoxLoader color={'#123abc'} size={500} loading={self.state.syncing} />
                    </div>
                    <div className="synced-issues">
                        {!self.state.syncing && self.state.syncedIssues.length == 0 && <p>No synced issuesitories</p>}
                        {!self.state.syncing && self.state.syncedIssues.length > 0 &&
                            <div>
                                {self.state.syncedIssues.map((issue, index) => {
                                    return (<div className="synced-issue">
                                        <p>{JSON.stringify(issue)}</p>
                                    </div>)
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
