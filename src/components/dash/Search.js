import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';

import { socket, cookies, postSearchIssues } from './../../utils/api';
import { fbLogin } from '../../utils/fire';

import githelpers from '../../assets/githelpers_trans.png';
import { firebaseAuth } from '../../utils/fire';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      issues: [],
      lastQuery: null
    }

    this._search = this._search.bind(this);
    this._renderIssue = this._renderIssue.bind(this);
    this._shareIssue = this._shareIssue.bind(this);
  }

  // Use facebook graph api to promote this issue to a particular user.
  _shareIssue(issue) {
    console.log('sharing issue', issue);
  }

  _renderIssue(issue) {
    const self = this;
    return (
      <div>
        <span className="githelpers-result-title">Issue: <a href={issue.html_url} >{issue.title}</a></span>
        <p>Issue Body: {issue.body}</p>
        <p>Last Updated: {issue.updated_at}</p>
        <Button bsStyle="info" bsSize="large" onClick={() => { self._shareIssue(issue) }}>
          Share Issue with a Friend <i class="fa fa-share facebook-blue" aria-hidden="true"></i>
        </Button>
      </div>
    );
  }

  _search(query) {
    const self = this;
    this.setState({ lastQuery: query, searching: true, error: null });
    console.log('searching', this.searchInput.value);

    const user = cookies.get('user');
    var username;
    if (user !== undefined && user['login'].length) {
      username = user['login'];
    } else {
      username = 'A guest'
    }

    postSearchIssues(query).then((res) => {
      self.setState({ issues: res, searching: false });
    }).catch((err) => {
      console.error('error searching', err);
      this.setState({ issues: [], searching: false, error: err });
    });

    const len = Math.min(query.length, 15)
    const shortQuery = query.slice(0, len);
    socket.emit('action', { name: `${username} just searched for ${shortQuery}.`, time: Date.now() }, (data) => {
      console.log('action ack', data);
    });

  }

  render() {
    const self = this;
    const issueResults = self.state.issues;

    return (
      <div className="full-height container">
        <div className="search-form centered">
          <img src={githelpers} className="centered search-image" />
          <h3 className="centered search-banner-text">Discover Repositories that need your help.</h3>
          <p className="search-subtitle-text">Enter any string of characters, including languages and topics, which we will attempt to match as best as possible with our database of available <b>githelpers</b>-tagged issues.</p>
          {this.props.currentUser == null &&
            <p>Login with <span onClick={() => fbLogin()} className="facebook-blue bold pointer">Facebook</span> to connect with friends over open source projects via githelpers.</p>}
          <FormGroup>
            <FormControl type="text" placeholder="Search" inputRef={input => this.searchInput = input} />
          </FormGroup>
          <Button type="submit" onClick={() => this._search(this.searchInput.value)} bsStyle="success">Search Projects</Button>
          <hr />
        </div>
        <div className="search-issues">
          <div className="searching centered">
            <ClimbingBoxLoader color={'#123abc'} size={500} loading={this.state.searching} />
          </div>

          <ListGroup>
            {self.state.lastQuery && <ListGroupItem
              header={"Githelpers issue results for " + self.state.lastQuery} bsStyle="info">
            </ListGroupItem>}

            {!self.state.searching && !self.state.error && self.state.lastQuery && issueResults.length == 0 &&
              <ListGroupItem className="centered search-issue"><h4>No active 'githelpers' issues for {self.state.lastQuery}</h4></ListGroupItem>
            }

            {!self.state.searching && self.state.error &&
              <h3 className="centered error-text">Error: {self.state.error.message}</h3>
            }

            {!self.state.searching && issueResults.length > 0 &&
              <div>
                {issueResults.map((issue, index) => {
                  return (<ListGroupItem className='search-issue' key={index}>
                    <p>{self._renderIssue(issue)}</p>
                  </ListGroupItem>);
                })}
              </div>
            }
          </ListGroup>
        </div>
      </div>
    )
  }
}
