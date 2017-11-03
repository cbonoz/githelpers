import React, { Component } from 'react'
import SearchInput, {createFilter} from 'react-search-input'

// TODO: replace with data retrieved from api (github requests for help - present in a searchable view)
import emails from './data/mails'
const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']

export default class Search extends Component {
    constructor (props) {
        super(props)
        this.state = {
          searchTerm: ''
        }
        this.searchUpdated = this.searchUpdated.bind(this)
      }
    
      searchUpdated (term) {
        this.setState({searchTerm: term})
      }

      render () {
        const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    
        return (
          <div>
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            {filteredEmails.map(email => {
              return (
                <div className="mail" key={email.id}>
                  <div className="from">{email.user.name}</div>
                  <div className="subject">{email.subject}</div>
                </div>
              )
            })}
          </div>
        )
      }
}
