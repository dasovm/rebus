import React, { Component } from 'react';
import styles from './App.module.css';
import { Link, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import Login from '../Login/Login';
import JoinChannel from '../JoinChannel/JoinChannel';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/join' component={JoinChannel}/>
          <Route path='/chat/:id' component={Chat}/>
        </Switch>
      </main>
    );
  }
}

export default App;
