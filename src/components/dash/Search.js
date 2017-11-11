import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

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
    this.setState( {searched: true});
    console.log('searching', this.searchInput.value);
  }

  render() {
    const self = this;
    return (
      <div>
        <FormGroup>
          <FormControl type="text" placeholder="Search" inputRef={input => this.searchInput = input} />
        </FormGroup>
        {' '}
        <Button type="submit" onClick={() => this._search()}>Submit</Button>
        <hr/>
        {self.state.searched && self.searchInput.value && <div><p>No search results for {self.searchInput.value}</p></div>}
      </div>
    )
  }
}
