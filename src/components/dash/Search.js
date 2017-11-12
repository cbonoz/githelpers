import React, { Component } from 'react';
import { FormControl, FormGroup, Button, Row, Col, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ClimbingBoxLoader } from 'react-spinners';
import githelpers from '../../assets/githelpers_trans.png';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      results: [],
      lastQuery: null
    }

    this._search = this._search.bind(this);
  }

  _search(query) {
    this.setState({ lastQuery: query, searching: true });
    console.log('searching', this.searchInput.value);
    // TODO: make web request to populate results (set searching to false once completed).
    this.setState({ results: [], searching: false });
  }

  render() {
    const self = this;
    return (
      <div className="full-height container">
        <div className="search-form centered">
          <img src={githelpers} className="centered search-image"/>
          <h3 className="centered search-banner-text">Browse Repositories that need your help.</h3>
          <p>Enter any string of characters, including languages and topics, which we will attempt to match as best as possible with our database of available tagged repositories.</p>
          {' '}
          <FormGroup>
            <FormControl type="text" placeholder="Search" inputRef={input => this.searchInput = input} />
          </FormGroup>
          <Button type="submit" onClick={() => this._search(this.searchInput.value)} bsStyle="success">Search Projects</Button>
          <hr />
        </div>
        <div className="search-results">
          <div className="searching">
            <ClimbingBoxLoader className="centered" color={'#123abc'} size={500} loading={this.state.searching} />
          </div>

          <ListGroup>
            {self.state.lastQuery && <ListGroupItem
              header={"Search results for " + self.state.lastQuery} bsStyle="info">
            </ListGroupItem>}

            {self.state.searching && self.state.lastQuery && self.state.results.length == 0 &&
              <ListGroupItem className="centered search-result"><h4>No search results for {self.state.lastQuery}</h4></ListGroupItem>
            }

            {!self.state.searching && self.state.lastQuery && self.state.results.length > 0 &&
              <div>
                {self.state.results.map((result, index) => {
                  return (<ListGroupItem className='search-result' key={index}>
                    <p>{JSON.stringify(result)}</p>
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
