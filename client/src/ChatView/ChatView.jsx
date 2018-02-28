import React, { Component } from 'react';
import styles from './ChatView.module.css';

class ChatView extends Component {
  render() {
    const {id} = this.props;
    return (
      <div className={styles.title}>Chat #{id} view goes here</div>
    );
  }
}

export default ChatView;
