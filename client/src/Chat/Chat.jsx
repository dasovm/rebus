import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ChatView from '../ChatView/ChatView';
import ChannelSettings from '../ChannelSettings/ChannelSettings';
import styles from './Chat.module.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Chat extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className={styles.Chat}>
        <h1 className={styles.title}>Chat id: {match.params.id}</h1>
        
        <Link to={match.url}>ChatView</Link>
        <Link to={match.url + '/settings'} >Channel Settings</Link>
        
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
