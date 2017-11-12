import React, { Component } from 'react'
import githelpers from '../assets/githelpers_trans_white.png';

export default class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: ''
        };
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        return (
            <footer >
                <div className="footer-distributed">

                    <div className="footer-left">

                        <h3><img src={githelpers} className="header-image" /></h3>

                        <p className="footer-links">
                            <a href="/">Home</a>&nbsp;-&nbsp;
                            <a href="/faq">FAQ</a>
                            {/* <a href="#">Pricing</a>
                            <a href="#">Contact</a> */}
                        </p>

                        <p className="footer-company-name">GitHelpers &copy; 2017</p>

                        <div className="footer-icons">

                            {/* <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                            <a href="#"><i className="fa fa-github"></i></a>
 */}
                        </div>

                    </div>

                    <div className="footer-right">
                        <p>Contact Us</p>

                        <form>
                            {/* {<input type="text" name="email" placeholder="Email" />} */}
                            <textarea onChange={evt => this.updateInputValue(evt)} value={this.state.inputValue} name="message" placeholder="Message" ></textarea>
                            <a target="_blank" href={`mailto:blackshoalgroup@gmail.com?subject=Hello&amp;body=${this.state.inputValue}`}>
                                <button>Send</button>
                            </a>
                        </form>

                    </div>

                </div>

            </footer>
        )
    }
}
