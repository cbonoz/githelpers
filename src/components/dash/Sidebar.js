import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Sidebar extends Component {

    _activePage(page) {
        return this.props.currentPage === page;
    }

    render() {
        const pageList = [
            'Discover',
            'Your Profile',
            'Live Events',
            'Getting Started',
            'User Information'
        ];

        const self = this;
        return (
            <div className="sidebar-container">
                <ListGroup>
                    <ListGroupItem className={"sidebar-item"} header={"Dashboard"} bsStyle="success">
                    </ListGroupItem>
                    {pageList.map((pageTitle, index) => {
                        return (<ListGroupItem key={index} className={"sidebar-item " + (self._activePage(index) ? 'selected-item' : '')} onClick={() => this.props.updateCurrentPage(index)}>
                            {pageTitle}
                        </ListGroupItem>)
                    })}
                </ListGroup>
            </div>
        )
    }
}
