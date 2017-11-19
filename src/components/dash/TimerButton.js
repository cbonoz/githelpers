import React, { Component } from 'react'
import { Button, OverlayTrigger } from 'react-bootstrap';

export default class TimerButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secondsLeft: 0,
            timerInterval: null,
            buttonText: this.props.buttonText
        }

        this.duration = this.props.duration > 0 ? this.props.duration : 0;

        this._onClick = this._onClick.bind(this);
        this._updateTimeLeft = this._updateTimeLeft.bind(this);
    }

    _secondsToFormattedTime(seconds) {
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }

    _updateTimeLeft() {
        const secondsLeft = this.state.secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(this.state.timerInterval);
            this.setState( {timerInterval: null, buttonText: this.props.buttonText} );
            return;
        }

        this.setState( {secondsLeft: secondsLeft - 1} );
        this.setState( {buttonText: this._secondsToFormattedTime(this.state.secondsLeft) });
    }

    _onClick() {
        const self = this;
        if (self.state.secondsLeft === 0) {
            self.setState( { 
                secondsLeft: self.duration, 
                timerInterval: setInterval(() => self._updateTimeLeft(), 1000), 
                buttonText: self._secondsToFormattedTime(self.duration)
            });
            self.props.onClick();
        }
    }
    
    render() {
        return (
            <div>
                <OverlayTrigger overlay={this.props.popover} rootClose={true}>
                    <span>
                        <Button
                            className="refresh-button" 
                            bsStyle={this.props.bsStyle || 'danger'}
                            bsSize={this.props.bsSize || 'large'}
                            disabled={this.state.secondsLeft !== 0}
                            onClick={() => {this._onClick()}}>
                            {this.state.buttonText}
                        </Button>
                    </span>
                </OverlayTrigger>
            </div>
        )
    }
}
