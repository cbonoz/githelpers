import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import Search from './components/dash/Search';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { cookies } from './utils/api';

import './App.css';
import './footer.css';

import { firebaseAuth } from './utils/fire';
import { ToastContainer } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/#How-it-works-
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

function PrivateRoute({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}/>
  );
}

function PublicRoute({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}/>
  );
}

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      authed: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        if (!this.state.authed) { // show if there is a change in state.
          toast(<div><b>Welcome: {user.displayName}</b></div>);
        }
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        if (this.state.authed) {
          toast(<div><b>Logged out, come again soon.</b></div>);
        }
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header authed={this.state.authed}/>
            <Switch>
              <Route authed={this.state.authed} path="/faq" component={FAQ} />
              <Route authed={this.state.authed} path="/search" component={Search} />
              <PublicRoute authed={this.state.authed} exact path="/" component={Home} />
              <PrivateRoute authed={this.state.authed} path="/dashboard" component={Dashboard}/>
              <Route authed={this.state.authed} render={() => <h1 className="centered">Page not found</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
      </div>
    );
  }
}

export default App;
