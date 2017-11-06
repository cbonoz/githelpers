import React, { Component } from 'react'
import Accordion from './data/Accordion';

export default class FAQ extends Component {
    render() {
        return (
            <div>
              <h1 className="centered">FAQ</h1>
              <Accordion question={"How many users"}>
                  <p>Ans: About 5</p>
              </Accordion>
                
            </div>
        )
    }
}
