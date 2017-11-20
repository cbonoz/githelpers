import React, { Component } from 'react';
import { Button, FormControl, FormGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';

import { socket, cookies, postSearchIssues } from './../../utils/api';
import { fbLogin } from '../../utils/fire';
import SearchResults from './SearchResults';

import githelpers from '../../assets/githelpers_trans.png';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      issues: [],
      visibleIssues: [],
      lastQuery: null,
      resultsPerPage: 10,
    }

    this._search = this._search.bind(this);
    this._handlePageClick = this._handlePageClick.bind(this);
    this._updateIssuesPage = this._updateIssuesPage.bind(this);
  }

  _search(query) {
    const self = this;
    this.setState({ lastQuery: query, searching: true, error: null });
    console.log('searching', this.searchInput.value);

    const user = this.props.currentUser;
    postSearchIssues(query).then((data) => {
      self.setState({ issues: data, searching: false });
      // Select/show the first page of results by default.
      self._updateIssuesPage(0);
    }).catch((err) => {
      console.error('error searching', err);
      self.setState({ issues: [], searching: false, error: err });
    });

    var userName = 'A guest';
    if (user !== undefined && user['displayName'].length) {
      const displayName = user['displayName'];
      if (displayName) {
        userName = displayName.split()[0];
      }
    }

    const len = Math.min(query.length, 15)
    const shortQuery = query.slice(0, len);
    console.log('emitting event');
    socket.emit('action', { name: `${userName} just searched for ${shortQuery}.`, time: Date.now() }, (data) => {
      console.log('action ack', data);
    });
  }

  _updateIssuesPage(selected) {
    const self = this;
    const issues = self.state.issues;
    console.log('issues', issues)
    const startIndex = Math.min(Math.ceil(selected * self.state.resultsPerPage), issues.length);
    const endIndex = Math.min(startIndex + self.state.resultsPerPage, issues.length);
    self.setState({ visibleIssues: issues.slice(startIndex, endIndex) });
  }

  _handlePageClick = (data) => {
    const self = this;
    const selected = data.selected;
    self._updateIssuesPage(selected);
    // self.setState({offset: offset}, () => {
    //   this.loadCommentsFromServer();
    // });
  };

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
            <p>Login with <span onClick={() => fbLogin()} className="facebook-blue bold pointer">Facebook</span> to share projects with friends selectable in the githelpers platform.</p>}
          <FormGroup>
            <FormControl type="text" placeholder="Search Issues" inputRef={input => this.searchInput = input} className="githelpers-search-input" />
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

            {!self.state.searching && !self.state.error && self.state.lastQuery && issueResults.length === 0 &&
              <ListGroupItem className="centered githelpers-results"><h4>No open <b>githelpers</b> issues for {self.state.lastQuery}</h4></ListGroupItem>
            }

            {!self.state.searching && self.state.error &&
              <h3 className="centered error-text githelpers-results">Error: {self.state.error.message}</h3>
            }

            {!self.state.searching && issueResults.length > 0 &&
              <div className="githelpers-results">
                <SearchResults issues={this.state.visibleIssues} currentUser={this.props.currentUser}/>
                <ReactPaginate previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this._handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              </div>
            }
          </ListGroup>
        </div>
      </div>
    )
  }
}
