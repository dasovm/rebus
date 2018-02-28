import React, { Component } from 'react';
import styles from './ChatView.module.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class ChatView extends Component {
  render() {
    const {id} = this.props;
    return (
      <div className={styles.Chat}>
        <div className={styles.chats}>
          chats
        </div>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <h1 className={styles.h1}>ChatName</h1>
            <h2 className={styles.h2}>id #12351</h2>
          </div>
          <FlatButton label="Leave Channel" backgroundColor="#ff4757" hoverColor="#ff6b81" className={styles.leaveChannel} />
        </div>
        <div className={styles.content}>
          content
        </div>
        <div className={styles.input}>
          <TextField hintText="Write message here..." className={styles.textField} />
        </div>
      </div>
    );
  }
}

export default ChatView;
