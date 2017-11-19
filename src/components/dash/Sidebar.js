import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Sidebar extends Component {

    _activePage(page) {
        return this.props.currentPage === page;
    }

    render() {
        const self = this;
        return (
            <div className="sidebar-container">
                <ListGroup>
                    <ListGroupItem className={"sidebar-item"} header={"Dashboard"} bsStyle="success">
                    </ListGroupItem>
                    <ListGroupItem className={"sidebar-item " + (self._activePage(0) ? 'selected-item' : '')} onClick={() => this.props.updateCurrentPage(0)}>
                        Your Profile
                    </ListGroupItem>
                    <ListGroupItem className={"sidebar-item " + (self._activePage(1) ? 'selected-item' : '')} onClick={() => this.props.updateCurrentPage(1)}>
                        User Statistics
                    </ListGroupItem>
                    <ListGroupItem className={"sidebar-item " + (self._activePage(2) ? 'selected-item' : '')} onClick={() => this.props.updateCurrentPage(2)}>
                        Getting Started
                    </ListGroupItem>
                    <ListGroupItem className={"sidebar-item " + (self._activePage(3) ? 'selected-item' : '')} onClick={() => this.props.updateCurrentPage(3)}>
                        Live Events
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
