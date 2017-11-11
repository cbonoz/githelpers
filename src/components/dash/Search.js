import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

import { ClimbingBoxLoader } from 'react-spinners';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      searching: false,
      results: []
    }
  }

  _search() {
    this.setState({ searched: true, searching: true });
    console.log('searching', this.searchInput.value);
  }

  render() {
    const self = this;
    return (
      <div>
        <div className="search-form">
          <h3>Browse Repositories that need your help.</h3>
          <FormGroup>
            <FormControl type="text" placeholder="Search" inputRef={input => this.searchInput = input} />
          </FormGroup>
          {' '}
          <Button type="submit" onClick={() => this._search()} bsStyle="success">Search Projects</Button>
          <hr />
        </div>
        <div className="search-results">
          <div className="centered">
            <ClimbingBoxLoader color={'#123abc'} size={500} loading={this.state.searching} />
          </div>
          {self.state.searched && self.searchInput.value && <div><p>No search results for {self.searchInput.value}</p></div>}
        </div>
      </div>
    )
  }
}
