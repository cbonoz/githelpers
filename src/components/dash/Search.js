import React, { Component } from 'react';
import { FormControl, FormGroup, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';

import { socket, cookies, postSearchIssues } from './../../utils/api';

import githelpers from '../../assets/githelpers_trans.png';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      issues: [],
      lastQuery: null,
      error: null
    }

    this._search = this._search.bind(this);
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
    return (
      <div className="full-height container">
        <div className="search-form centered">
          <img src={githelpers} className="centered search-image" />
          <h3 className="centered search-banner-text">Discover Repositories that need your help.</h3>
          <p>Enter any string of characters, including languages and topics, which we will attempt to match as best as possible with our database of available label ged repositories.</p>
          {' '}
          <FormGroup>
            <FormControl type="text" placeholder="Search" inputRef={input => this.searchInput = input} />
          </FormGroup>
          <Button type="submit" onClick={() => this._search(this.searchInput.value)} bsStyle="success">Search Projects</Button>
          <hr />
        </div>
        <div className="search-issues">
          <div className="searching">
            <ClimbingBoxLoader className="centered" color={'#123abc'} size={500} loading={this.state.searching} />
          </div>

          <ListGroup>
            {self.state.lastQuery && <ListGroupItem
              header={"Githelpers issue results for " + self.state.lastQuery} bsStyle="info">
            </ListGroupItem>}

            {!self.state.searching && !self.state.error && self.state.lastQuery && self.state.issues.length == 0 &&
              <ListGroupItem className="centered search-issue"><h4>No active 'githelpers' issues for {self.state.lastQuery}</h4></ListGroupItem>
            }

            {!self.state.searching && self.state.error &&
              <h3 className="centered error-text">Error: {self.state.error.message}</h3>
            }

            {!self.state.searching && self.state.issues.length > 0 &&
              <div>
                {self.state.issues.map((issue, index) => {
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
