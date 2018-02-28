import React, { Component } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../Home/Home';

class App extends Component {
  render() {
    return (
      <Router>
      <div className={styles.App}>
        <div>
          <h1>Test link</h1>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </div>
      </div>
      <Route path="/home" component={Home} />
      </Router>
    );
  }
}

export default App;
