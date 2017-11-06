import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import Header from './components/Header';

import Home from './components/Home';
import FAQ from './components/FAQ';
import Login from './components/Login';

import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

class App extends Component {
  
  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Header/>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/faq" component={FAQ} />
              <Route path="/login" component={Login} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
