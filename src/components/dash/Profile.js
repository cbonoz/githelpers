import React, { Component } from 'react'
import { Button, FormGroup, ListGroup, ListGroupItem, Popover } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';
import TimerButton from './TimerButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import github from './../../utils/github';
import { postIssues } from './../../utils/api';
import { cookies, socket, postSocketEvent } from './../../utils/api';
import { firebaseAuth } from '../../utils/fire';

import checkImage from './../../assets/checkImage.png';
import cancelImage from './../../assets/cancelImage.png';

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            issues: {}, // id -> issue
            repos: [],
            clickedRepos: new Set(),
            syncedRepos: {},
            syncing: false,
            error: null,
            githubName: null,
            nameError: null
        }

        this._handleGithubNameChange = this._handleGithubNameChange.bind(this);
        this._renderIssue = this._renderIssue.bind(this);
        this._renderRepo = this._renderRepo.bind(this);
        this._syncIssuesForRepo = this._syncIssuesForRepo.bind(this);
        this._getIssuesForUser = this._getIssuesForUser.bind(this);
        this.client = github.client;
    }

    componentWillMount() {
        var existingUserName = cookies.get('githubName');
        if (existingUserName == null || existingUserName == undefined) {
            existingUserName = "";
        }
        this.setState({ githubName: existingUserName })
    }

    componentDidMount() {
        const githubName = cookies.get('githubName') || null;
        this.setState({ githubName: githubName, currentUser: firebaseAuth.currentUser });
        this._syncRepos();
        if (githubName) {
            this._getIssuesForUser(githubName);
        }
    }

    _getIssuesForUser(user) {
        // TODO: prefetch issues associated with the particular user (if it was stored in the cookie).
    }

    _syncIssuesForRepo(repo) {
        const self = this;
        const ghrepo = this.client.repo(repo['full_name'])
        ghrepo.issues((err, data, h) => {
            const repoId = repo['id'];
            if (err) {
                if (self.state.syncedRepos.hasOwnProperty(repoId)) {
                    delete self.state.syncedRepos[repoId]
                }
                self.setState( {error: err});
                return;
            }

            // Filter to 'githelpers' issues.
            const ghIssues = data.filter((issue) => issue['labels'].filter((label) => label.name.toLowerCase() === 'githelpers').length);

            self.state.clickedRepos.add(repoId)
            self.state.syncedRepos[repoId] = ghIssues.length;
            postIssues(ghIssues).then((res) => {
                console.log(' issues to db');
                self.setState({ syncing: false });
            }).catch((err) => {
                console.error('error syncing issues to db', err);
                self.setState({ syncing: false });
            })

            // TODO: only insert if the db insert was successful.
            const existingIssues = self.state.issues;
            ghIssues.map((issue) => {
                existingIssues[issue['id']] = issue;
            });
            self.setState({ issues: existingIssues });
        });
    }

    // Fetch all repos for an user
    _syncRepos() {
        const self = this;
        const githubName = self.state.githubName;
        if (!githubName) {
            self.setState({ nameError: "Enter a valid github username" });
            return;
        } else {
            self.setState({ nameError: null });
        }

        var ghuser = self.client.user(githubName);
        ghuser.repos((err, data, headers) => {
            if (err) {
                self.setState({ error: err });
                return;
            }
            // Only show repos with open issues.
            const issueRepos = data.filter((issue) => issue['open_issues'] > 0).sort((a, b) => a['open_issues'] < b['open_issues']);
            console.log('repos', issueRepos);
            self.setState({ repos: issueRepos });
        })
    }

    _renderRepo(repo) {
        const self = this;
        return (
            <div>
                <span className="githelpers-result-title">Repo: <a href={repo.html_url} >{repo.name}</a></span>
                <p>Description: {repo.description}</p>
                <p>Watchers: {repo.watchers_count}</p>
                <p>Last Updated: {repo.updated_at}</p>
                {/* Show sync button */}
                {!self.state.clickedRepos.has(repo['id']) && 
                    <Button bsStyle="success"
                        onClick={() => self._syncIssuesForRepo(repo)}
                        disabled={self.state.clickedRepos.has(repo['id'])}>
                        Sync Issues from this Repo <i className="fa fa-refresh" aria-hidden="true"></i>
                    </Button>
                }
                {/* Show sync result */}
                {self.state.clickedRepos.has(repo['id']) && 
                    <div className="sync-result-box">
                        <img className="sync-result-image" src={self.state.syncedRepos[repo['id']] ? checkImage : cancelImage }/><br/>
                        <b>{self.state.syncedRepos[repo['id']] ? self.state.syncedRepos[repo['id']] : 0}</b>
                        &nbsp;synced issues.
                    </div> 
                }
            </div>
        );
    }

    _renderIssue(issue) {
        const self = this;
        return (
            <div>
                <span className="githelpers-result-title">Issue: <a href={issue.html_url} >{issue.title}</a></span>
                <p>Issue Body: {issue.body}</p>
                <p>Last Updated: {issue.updated_at}</p>
            </div>
        );
    }

    _handleGithubNameChange(event) {
        const newName = event.target.value;
        cookies.set('githubName', newName);
        this.setState({ githubName: newName });
    }

    render() {
        const self = this;
        const currentUser = self.props.currentUser;

        const popover = (
            <Popover id="modal-popover" title="Refresh issues">
                Clicking here will scan your repositories for new issues label ged with 'githelpers' and sync them to the githelpers database. These will appear below.
                </Popover>
        );

        const myIssues = self.state.issues;
        const myIssueIds = myIssues ? Object.keys(myIssues) : [];
        const myIssueValues = myIssues ? Object.values(myIssues) : [];

        const myRepos = self.state.repos;

        return (
            <div className="profile-content">
                <ListGroup>
                    <ListGroupItem header={"Your Profile: " + (currentUser != null ? currentUser.displayName : "")} bsStyle="info"></ListGroupItem>
                    <ListGroupItem>
                        <FormGroup className="centered">
                            <h4 className="facebook-blue">Enter your Github UserName</h4>
                            <input type="text" className="github-name-input" value={this.state.githubName} onChange={this._handleGithubNameChange} />
                            <p>You can use your github name or someone else's, as long as the issues are publicly visible you can sync them to githelpers!</p>
                            {self.state.nameError && <p className="red">{self.state.nameError}</p>}
                        </FormGroup>
                        <TimerButton bsStyle="danger" bsSize="large" duration={5} popover={popover}
                            onClick={() => self._syncRepos()} buttonText={"Refresh Your Repositories"} />
                    </ListGroupItem>

                    {self.state.githubName && myRepos.length &&
                        <Tabs>
                            <TabList>
                                <Tab>Repos with Issues for {this.state.githubName}</Tab>
                                <Tab>Synced Issues ({myIssueIds.length})</Tab>
                            </TabList>

                            <TabPanel>
                                {/* REPOS */}

                                <div className="sync-results">
                                    {/* <ListGroupItem header={"Your current repos (with at least one open repo):"} /> */}
                                    <div className="-repos">
                                        {!self.state.syncing && !self.state.error && myRepos.length === 0 &&
                                            <h3 className="centered githelpers-results">No Repos found with open repos</h3>}
                                        {self.state.error && <h3 className="centered error-text">Error: {self.state.error.message}</h3>}
                                        {!self.state.syncing && myRepos.length > 0 &&
                                            <h4 className="centered githelpers-results">{myRepos.length} Repos for {self.state.githubName} found with open Issues</h4>}
                                        <div>
                                            {myRepos.map((repo, index) => {
                                                return (<ListGroupItem className="-repo" key={index}>
                                                    {self._renderRepo(repo)}
                                                </ListGroupItem>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                {/* ISSUES */}
                                <div className="sync-results">
                                    {/* <ListGroupItem header={"Your current tagged issues:"} /> */}
                                    <div className="-issues">
                                        {!self.state.syncing && !self.state.error && myIssueIds.length === 0 &&
                                            <h3 className="centered githelpers-results">No <b>'githelpers'</b> Issues currently Synced</h3>}
                                        {self.state.error && <h3 className="centered error-text">Error: {self.state.error.message}</h3>}
                                        {!self.state.syncing && myIssueIds.length > 0 &&
                                            <h4 className="centered githelpers-results">{myIssueIds.length} Active <b>'githelpers'</b> Issues </h4>}
                                        <div>
                                            {myIssueValues.map((issue, index) => {
                                                return (<ListGroupItem className="-issue" key={index}>
                                                    {self._renderIssue(issue)}
                                                </ListGroupItem>)
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>

                        </Tabs>}

                </ListGroup>
            </div>
        )
    }
}
