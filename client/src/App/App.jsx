import React, { Component } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className={styles.App}>
            <div>
              <h1>Test link</h1>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                  <Link to="/chat">Chat</Link>
                </li>
              </ul>
            </div>
          </div>
          <Route path="/home" component={Home} />
          <Route path="/chat" component={Chat} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
