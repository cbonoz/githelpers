import React, { Component } from 'react'
import { Button, ListGroupItem } from 'react-bootstrap';
import fb from '../../utils/facebook';
import { toast } from 'react-toastify';

export default class SearchResults extends Component {

    constructor(props) {
        super(props)
        this._renderIssue = this._renderIssue.bind(this);
    }

  // Use facebook send dialog to promote this issue to a particular user.
  _shareIssue(issue) {
    console.log('sharing issue', issue);
    fb.shareIssueDialog(issue).then((res) => {
        console.log('shareIssueDialog', res);
        // Success popup to the end user.
        toast(<div><b>{res}</b></div>);
    });
  }

  _renderIssue(issue) {
    const self = this;
    return (
      <div>
        <span className="githelpers-result-title">Issue: <a href={issue.html_url} >{issue.title}</a></span>
        <p>Issue Body: {issue.body}</p>
        <p>Last Updated: {issue.updated_at}</p>
        {this.props.currentUser != null && <Button bsStyle="info" bsSize="large" onClick={() => { self._shareIssue(issue) }}>
            Share Issue with a Friend <i class="fa fa-share facebook-blue" aria-hidden="true"></i>
        </Button>}
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
