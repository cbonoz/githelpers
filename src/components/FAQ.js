import React, { Component } from 'react'
import Accordion from './data/Accordion';

export default class FAQ extends Component {

    constructor(props) {
        super(props)
        this.questions = [
            {
                question: "How many users",
                answer: "About 5"
            },
            {
                question: "How many users",
                answer: "About 5"
            },
            {
                question: "How many users",
                answer: "Also about 5"
            }
        ]
    }

    render() {
        return (
            <div className="container">
                <h1 className="centered black page-header">FAQ</h1>
                {this.questions.map((entry, index) => {
                    return (<Accordion key={index} question={entry.question}>
                        <p>{entry.answer}</p>
                    </Accordion>);
                })}
                <p className="centered">Click the Login button to begin</p>
            </div>
        )
    }
}
