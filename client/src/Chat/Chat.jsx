import React, { Component } from 'react';
import styles from './Chat.module.css';

class Chat extends Component {
  render() {
    return (
      <div className={styles.Chat}>
        <h1 className={styles.title}>Chat name</h1>
        <div className={styles.chatView}>Chat view goes here</div>
      </div>
    );
  }
}

export default Chat;
