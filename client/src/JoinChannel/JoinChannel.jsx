import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from './JoinChannel.module.css';
import HomeButton from '../HomeButton';

class JoinChannel extends Component {
  render() {
    return (
      <div className={styles.JoinChannel}>
        <HomeButton />
        <div className={styles.blocks}>
          <div className={styles.newBlock}>
            <h3>Create new channel:</h3>
            <div className={styles.textField}>
              <TextField hintText="name" className={styles.testTextField} />
              <FlatButton label="Create" backgroundColor="#2ed573" hoverColor="#7bed9f" className={styles.submitButton} />
            </div>
          </div>
          <p>or</p>
          <div className={styles.joinBlock}>
            <h3>Join existing channel:</h3>
            <div className={styles.textField}>
              <TextField hintText="id" />
              <FlatButton label="Join" backgroundColor="#2ed573" hoverColor="#7bed9f" className={styles.submitButton} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinChannel;
