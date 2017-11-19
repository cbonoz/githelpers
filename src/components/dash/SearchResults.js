import React, { Component } from 'react'
import { Button, ListGroupItem } from 'react-bootstrap';

export default class SearchResults extends Component {

    constructor(props) {
        super(props)
        this._renderIssue = this._renderIssue.bind(this);
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
    
    render() {
        const self = this;
        return (
            <div>
                  {self.props.issues.map((issue, index) => {
                  return (<ListGroupItem className='search-issue' key={index}>
                    <p>{self._renderIssue(issue)}</p>
                  </ListGroupItem>);
                })}
            </div>
        )
    }
}
