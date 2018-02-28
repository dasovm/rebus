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
      <div>
          <header>
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/join'>Join</Link></li>
                <li><Link to='/chat/1'>Chat #1 typ</Link></li>
              </ul>
            </nav>
          </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/join' component={JoinChannel}/>
            <Route path='/chat/:id' component={Chat}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
