import React, { Component } from 'react';
import styles from './Home.module.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <h1 className={styles.title}>Aktiva chattar</h1>
        <div className={styles.chatList}>
          <div className={styles.chatCard}>Chatt #1</div>
          <div className={styles.chatCard}>Chatt #2</div>
          <div className={styles.chatCard}>Chatt #3</div>
          <div className={styles.chatCard}>Chatt #4</div>
          <div className={styles.chatCard}>Chatt #5</div>
          <div className={styles.chatCard}>Chatt #6</div>
          <div className={styles.chatCard}>Chatt #7</div>
          <div className={styles.chatCard}>Chatt #8</div>
          <div className={styles.chatCard}>Chatt #9</div>
        </div>
        <FloatingActionButton href="/join" className={styles.addNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default Home;
