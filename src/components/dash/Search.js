import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';

import { socket, cookies, postSearchIssues } from './../../utils/api';
import { fbLogin } from '../../utils/fire';
import SearchResults from './SearchResults';

import githelpers from '../../assets/githelpers_trans.png';
import { firebaseAuth } from '../../utils/fire';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      issues: [],
      visibleIssues: [],
      lastQuery: null,
      resultsPerPage: 10
    }

    this._search = this._search.bind(this);
    this._handlePageClick = this._handlePageClick.bind(this);
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

    postSearchIssues(query).then((data) => {
      self.setState({ issues: data, searching: false });
      // Select/show the first page of results by default.
      self._handlePageClick(0);
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

  _handlePageClick = (data) => {
    const self = this;
    const selected = data.selected;

    const issues = self.state.issues;
    const startIndex = Math.min(Math.ceil(selected * self.state.resultsPerPage), issues.length);
    const endIndex = Math.min(startIndex + self.state.resultsPerPage, issues.length);

    self.setState({ visibleIssues: issues.splice(startIndex, endIndex) });

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
            <p>Use your <span onClick={() => fbLogin()} className="facebook-blue bold pointer">Facebook</span> to connect with friends over open source projects via githelpers.</p>}
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
              <ListGroupItem className="centered githelpers-results"><h4>No open <b>githelpers</b> issues for {self.state.lastQuery}</h4></ListGroupItem>
            }

            {!self.state.searching && self.state.error &&
              <h3 className="centered error-text githelpers-results">Error: {self.state.error.message}</h3>
            }

            {!self.state.searching && issueResults.length > 0 &&
              <div className="githelpers-results">
                <SearchResults issues={this.state.visibleIssues} />
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
