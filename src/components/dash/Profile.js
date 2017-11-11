import React, { Component } from 'react'
import { gh } from '../../utils/github';

export default class Profile extends Component {

    constructor(props) {
        super(props)
    }
    
    componentWillMount() {
        console.log('gh', gh);
        // TODO: fetch user statistics from server.
        var clayreimann = gh.getUser('clayreimann');
        clayreimann.listStarredRepos(function(err, repos) {
           // look at all the starred repos!
        });
    }
    
    render() {
        return (
            <div>
                <h1>Profile</h1>
            </div>
        )
    }
}
