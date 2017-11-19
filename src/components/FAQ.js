import React, { Component } from 'react'
import Accordion from './data/Accordion';

export default class FAQ extends Component {

    constructor(props) {
        super(props)
        this.questions = [
            {
                question: "What is Githelpers?",
                answer: "Githelpers is a platform for connecting with your friends around building open source software. It is also a platform for getting additional visibility on the github issues you need help with."
            },
            {
                question: "How does Githelpers work?",
                answer: "Once you login, create issues on your repositories that you would like with (tag with the label 'githelpers'). Sync your repositories from the Githelpers dashboard page once logged in. Your label ged issues will now be searchable by developers around the world."
            },
            {
                question: "How long has Githelpers been around?",
                answer: "Githelpers was created in Fall 2017 for a Facebook developer circles project / hackathon."
            },
            {
                question: "Do I need an account?",
                answer: "Accounts are completely optional. Searching through the githelpers database is free and open to the public. An account is required if you want to contribute your own issues or projects to the githelpers database for discovery."
            },
            {
                question: "Why do I have to log in with Facebook for my account?",
                answer: "Githelpers is designed to be a connecting platform between facebook and open source on github. Your facebook is used to track your synced issues and enable you to submit additional ones to the githelpers public index."
            },
            {
                question: "Will Githelpers make any posts on my facebook wall?",
                answer: "No"
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
                <p className="centered faq-bottom-text large">Click the Login from the header bar to begin</p>
            </div>
        )
    }
}
