import React, { Component } from 'react';
import styles from './App.module.css';
import { Link, Switch, Route } from 'react-router-dom'
import Home from '../Home/Home';
import Login from '../Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
        </header>
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </main>
      </div>
    );
  }
}

export default App;
