    import React, { Component } from 'react'
    import { ListGroup, ListGroupItem, Popover } from 'react-bootstrap';
    import { ClimbingBoxLoader } from 'react-spinners';
    import TimerButton from './TimerButton';
    import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

    import github from './../../utils/github';
    import { postIssues } from './../../utils/api';
    import { cookies, socket, postSocketEvent } from './../../utils/api';
    import { firebaseAuth } from '../../utils/fire';

    export default class Profile extends Component {

        constructor(props) {
            super(props)
            this.state = {
                issues: [],
                repos: [],
                syncing: false,
                error: null,
                githubName: 'test'
            }

            this.handleGithubNameChange = this.handleGithubNameChange.bind(this);
            this._renderIssue = this._renderIssue.bind(this);
            this._renderRepo = this._renderRepo.bind(this);
            this.client = github.client;
        }

        handleGithubNameChange(event) {
            const newName = event.target.value;
            cookies.set('githubName', newName);
            this.setState({githubName: newName});
        }

        componentWillMount() {
            this.setState({ githubName: cookies.get('githubName')})
        }

        componentDidMount() {
            const githubName = cookies.get('githubName')

            this.setState({ githubName: githubName, currentUser: firebaseAuth.currentUser });
            this._syncRepos();
        }

        _syncIssuesForRepo(repo) {
            const self = this;
            const ghrepo = this.client.repo(repo['full_name'])
            ghrepo.issues((err, data, h) => {

                const ghIssues = data.filter((issue) => issue['labels'].filter((label) => label.name.toLowerCase() === 'githelpers').length);
                if (ghIssues.length === 0) {
                    // TODO: notify the user that nothing was synced.
                }

                self.setState({issues: ghIssues});
            });
        }

        _renderRepo(repo) {
            return (
                <div>
                    <h4>{repo.title}</h4>
                    <a href={repo.html_url}>Github Repo Link</a>
                    <p>Body: {repo.body}</p>
                    <p>Last Updated: {repo.updated_at}</p>
                </div>
            ); 
        }

        _renderIssue(issue) {
            return (
                <div>
                    <h4>{issue.title}</h4>
                    <a href={issue.html_url}>Github Issue Link</a>
                    <p>Body: {issue.body}</p>
                    <p>Last Updated: {issue.updated_at}</p>
                </div>
            );
        }

        // Fetch all repos for an user
        _syncRepos() {
            const self = this;
            var ghuser = self.client.user(this.state.githubName);
            ghuser.repos((err, data, headers) => {
                if (err) {
                    self.setState({ error: err });
                    return;
                }
                // Only show repos with open issues.
                const issueRepos = data.filter((issue) => issue['open_issues'] > 0).sort((a, b) => a['open_issues'] < b['open_issues']);
                console.log('repos', issueRepos);
                self.setState({ repos: data })
            })
        }

        // TODO: prevent user from repeatedly spanning syncissues button and web request.
        _syncissues() {
            const self = this;
            self.setState({ syncing: true, issues: [], error: null });

            console.log('syncing issues for user');
            const username = this.props.currentUser.displayName;
            const event = { name: `${username} just issues to the githelpers database.`, time: Date.now() };
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
                if (err) {
                    self.setState({ error: err });
                    self.setState({ syncing: false })
                    return;
                }
                self.setState({ issues: res })

                postIssues(self.state.issues).then((res) => {
                    console.log(' issues to db')
                    self.setState({ syncing: false })
                }).catch((err) => {
                    console.error('error syncing issues to db', err);
                    self.setState({ syncing: false })
                })
            });
        }

        render() {
            const self = this;
            const currentUser = self.props.currentUser;

            const popover = (
                <Popover id="modal-popover" title="Refresh issues">
                    Clicking here will scan your repositories for new issues label ged with 'githelpers' and sync them to the githelpers database. These will appear below.
                </Popover>
            );

            return (
                <div className="profile-content">
                    <ListGroup>
                        <ListGroupItem header={"Your Profile: " + (currentUser != null ? currentUser.displayName : "")} bsStyle="info"></ListGroupItem>
                        <ListGroupItem>
                            <input type="text" value={this.state.githubName} onChange={this.handleGithubNameChange} />
                            <TimerButton bsStyle="danger" bsSize="large" duration={5} popover={popover}
                                onClick={() => self._syncissues()} buttonText={"Refresh tagged issues"} />
                        </ListGroupItem>

                        {/* <ListGroup> */}
                        <Tabs>
                            <TabList>
                                <Tab>Your Repos</Tab>
                                <Tab>Synced Issues</Tab>
                            </TabList>

                            <TabPanel>
                                {/* REPOS */}

                                <div className="sync-results">
                                    <ListGroupItem header={"Your current repos (with at least one open issue):"} />
                                    <div className="syncing">
                                        <ClimbingBoxLoader className="centered" color={'#123abc'} size={500} loading={self.state.syncing} />
                                    </div>
                                    <div className="-repos">
                                        {!self.state.syncing && !self.state.error && self.state.repos.length === 0 &&
                                            <h3 className="centered issue-results">No Repos found with open issues</h3>}
                                        {self.state.error && <h3 className="centered error-text">Error: {self.state.error.message}</h3>}
                                        {!self.state.syncing && self.state.repos.length > 0 &&
                                            <h4 className="centered bold">{self.state.repos.length} repos </h4>}
                                        <div>
                                            {self.state.repos.map((issue, index) => {
                                                return (<ListGroupItem className="-issue" key={index}>
                                                    {self._renderissue(issue)}
                                                </ListGroupItem>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                {/* ISSUES */}
                                <div className="sync-results">
                                    <ListGroupItem header={"Your current tagged issues:"} />
                                    <div className="syncing">
                                        <ClimbingBoxLoader className="centered" color={'#123abc'} size={500} loading={self.state.syncing} />
                                    </div>
                                    <div className="-issues">
                                        {!self.state.syncing && !self.state.error && self.state.issues.length === 0 &&
                                            <h3 className="centered issue-results">No 'githelpers' issues</h3>}
                                        {self.state.error && <h3 className="centered error-text">Error: {self.state.error.message}</h3>}
                                        {!self.state.syncing && self.state.issues.length > 0 &&
                                            <h4 className="centered bold">{self.state.issues.length} issues </h4>}
                                        <div>
                                            {self.state.issues.map((issue, index) => {
                                                return (<ListGroupItem className="-issue" key={index}>
                                                    {self._renderissue(issue)}
                                                </ListGroupItem>)
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>

                        </Tabs>

                    </ListGroup>
                </div>
            )
        }
    }
