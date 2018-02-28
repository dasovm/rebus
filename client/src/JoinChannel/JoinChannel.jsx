import React, { Component } from 'react';
import styles from './JoinChannel.module.css';

class JoinChannel extends Component {
  render() {
    return (
      <div className={styles.JoinChannel}>
        <div className={styles.newBlock}>
          <input type="text" name="newChannel" placeholder="Create new"/>
        </div>
        <p>or</p>
        <div className={styles.joinBlock}>
          <input type="text" name="joinChannel" placeholder="Join channel"/>
        </div>
      </div>
    );
  }
}

export default JoinChannel;
