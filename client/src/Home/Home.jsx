import React, { Component } from 'react';
import styles from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <h1 className={styles.title}>Rebus</h1>
        <div className={styles.chatList}>
          <div className={styles.chatCard}>Chatt #1</div>
          <div className={styles.chatCard}>Chatt #2</div>
        </div>
        <button className={styles.addNew}>Add new chatt</button>
      </div>
    );
  }
}

export default Home;
