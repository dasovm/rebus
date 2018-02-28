import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ChatView from '../ChatView/ChatView';
import ChannelSettings from '../ChannelSettings/ChannelSettings';
import styles from './Chat.module.css';

class Chat extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className={styles.Chat}>
        <Route exact path={`${match.url}/settings`} render={() => <ChannelSettings id={match.params.id}/>} />
        <Route
          exact
          path={match.url}
          render={() => <ChatView id={match.params.id}/>} 
        />
      </div>
    );
  }
}

export default Chat;
