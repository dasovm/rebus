import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ChannelView from '../ChannelView/ChannelView';
import ChannelSettings from '../ChannelSettings/ChannelSettings';
import styles from './Channel.module.css';

class Channel extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className={styles.Channel}>
        <Route exact path={`${match.url}/settings`} render={() => <ChannelSettings id={match.params.id}/>} />
        <Route
          exact
          path={match.url}
          render={() => <ChannelView id={match.params.id}/>} 
        />
      </div>
    );
  }
}

export default Channel;
