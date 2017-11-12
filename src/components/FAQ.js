import React, { Component } from 'react'
import Accordion from './data/Accordion';

export default class FAQ extends Component {

    constructor(props) {
        super(props)
        this.questions = [
            {
                question: "What is GitHelpers?",
                answer: "GitHelpers is a platform for connecting with developers around the world building open source software."
            },
            {
                question: "How does GitHelpers work?",
                answer: "Once you login, create issues on your repositories that you would like with (tag with the tag 'githelpers'). Sync your repositories from the GitHelpers dashboard page once logged in. Your tagged issues will now be searchable by developers around the world."
            },
            {
                question: "How long has GitHelpers been around?",
                answer: "Githelpers was created in Fall 2017 for a Facebook developer circles project / hackathon."
            },
            {
                question: "Do I need an account?",
                answer: "Accounts are completely optional. Searching through the githelpers database is free and open to the public. An account is required if you want to contribute your own issues or projects to the githelpers database for discovery."
            },
            {
                question: "Why do I have to log in with Github for my account?",
                answer: "GitHelpers is designed to sync with your github repositories and issues. During this sync, we search for the 'githelpers' tag and automatically upload them to our githelpers database index - plus logging in does not require entering any sensitive passwords!"
            }
        ]
    }

    render() {
        return (
            <div className="container full-height">
                <h1 className="centered black page-header">FAQ</h1>
                {this.questions.map((entry, index) => {
                    return (<Accordion key={index} question={entry.question}>
                        <p className="large faq-box">{entry.answer}</p>
                    </Accordion>);
                })}
                <p className="centered faq-bottom-text large">Click the Login button to begin</p>
            </div>
        )
    }
}
