import React, { Component } from 'react'
import { Button, ListGroupItem, OverlayTrigger, Popover } from 'react-bootstrap';
import fb from '../../utils/facebook';
import { toast } from 'react-toastify';

export default class SearchResults extends Component {

    constructor(props) {
        super(props)
        this._renderIssue = this._renderIssue.bind(this);
    }

    // Use facebook send dialog to promote this issue to a particular user.
    // https://developers.facebook.com/docs/sharing/reference/send-dialog
    _shareIssue(issue) {
        fb.shareIssueDialog(issue).then((res) => {
            console.log('shareIssueDialog', res);
            // Success popup to the end user.
            toast(<div><b>{res}</b></div>);
        });
    }
 
    _renderIssue(issue) {
        const self = this;
        const popover = (
            <Popover id="modal-popover" title="Share Issue">
                Clicking here will open a new tab to share this issue directly with selected friends.
                </Popover>
        );

        return (
            <div>
                <span className="githelpers-result-title">Issue: <a href={issue.html_url} >{issue.title}</a></span>
                <p>Issue Body: {issue.body}</p>
                <p>Repository Url: {issue.repository_url}</p>
                <p>Last Updated: {issue.updated_at}</p>
                {self.props.currentUser != null && 
                <OverlayTrigger overlay={popover} rootClose={true}>
                    <a href={fb.getShareIssueLink(issue)} target="_blank">
                        {/* onClick={() => fb.shareIssueDialog(issue)}> */}
                        <Button bsStyle="info" bsSize="large"> 
                            Share Issue&nbsp;<i className="fa fa-share facebook-blue" aria-hidden="true"></i>
                        </Button>
                    </a>
                </OverlayTrigger>
                }
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
