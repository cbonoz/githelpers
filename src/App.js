import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import Search from './components/dash/Search';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';

import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { cookies } from './utils/api';

import './App.css';
import './footer.css';

class App extends Component {

  _requireAuth(nextState, replace) {
    // let loggedIn = store.getState().AppReducer.UserReducer.loggedIn;
    // TODO: replace loggedIn with value from redux store.
    console.log('requireAuth')
    const currentUser = cookies.get('user');
    const token = cookies.get('token');

    if (!currentUser || !token) {
      replace({
        pathname: '/login',
        state: {
          nextpathname: nextState.location.pathname
        }
      });
    }
  }

  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Header />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/faq" component={FAQ} />
              <Route path="/login" component={Login} />
              <Route path="/search" component={Search} />
              <Route path="/dashboard" component={Dashboard} onEnter={this._requireAuth}/>
                <Route render={() => <h1 className="centered">Page not found</h1>} />
            </Switch>

              <Footer />
          </div>
        </Router>
      </div>
        );
  }
}

export default App;
