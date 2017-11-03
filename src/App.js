import React, { Component } from 'react';
import Callback from './components/Callback';
import CelebrityJokes from './components/CelebrityJokes';
import FoodJokes from './components/FoodJokes';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from "./components/Login";
import Search from "./components/Search";

import { BrowserRouter, Route } from 'react-router-dom';
import { requireAuth } from './utils/AuthService';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App container">
      <Header/>
          <BrowserRouter>
            <Route path="/" component={Home}/>
            <Route path="/callback" component={Callback} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} onEnter={requireAuth} />
          </BrowserRouter>
      <Footer/>
      </div>

    );
  }
}

// <Route path="/create" component={Create} onEnter={requireAuth} />
export default App;
