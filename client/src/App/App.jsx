import React, { Component } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <div className={styles.App}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to Rebus chat app. Is nice.</h1>
        </header>
        <p className={styles.intro}>
          To get started, edit <code>src/App.jsx</code> and save to reload.
        </p>
      </div>
      </Router>
    );
  }
}

export default App;
