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
                answer: "Githelpers was created in 2017 for a Facebook developer circles project / hackathon."
            },
            {
                question: "Why do I have to log in with Github?",
                answer: "GitHelpers is designed to sync with your repositories. To do this, we make a simple index and search for particular tags. These are automatically uploaded for search - plus logging in does not require entering any sensitive passwords!"
            }
        ]
    }

    render() {
        return (
            <div className="container">
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
