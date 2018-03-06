import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './ChannelView.module.css';
import ChannelName from './ChannelName';
import ChannelViewList from './ChannelViewList';
import ChannelMessageList from './ChannelMessageList';

class ChannelView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      channelId: props.channelId,
    }
  }

  render() {
    return (
      <div className={styles.Channel}>
        <ChannelViewList />
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <ChannelName channelId={this.props.channelId} />
            <h2 className={styles.h2}>id {this.props.channelId}</h2>
          </div>
          <div>
            <FlatButton label="Leave Channel" backgroundColor="#ff4757" hoverColor="#ff6b81" className={styles.leaveChannel} />
            <FlatButton label="Settings" backgroundColor="#1e90ff" hoverColor="#70a1ff" className={styles.settings} href={`/channel/${this.props.channelId}/settings`} />
          </div>
        </div>
        <div className={styles.content}>
          <ChannelMessageList channelId={this.props.channelId} />
        </div>
        <div className={styles.input}>
          <TextField hintText="Write message here..." className={styles.textField} />
          <FlatButton label="Send" backgroundColor="#1e90ff" hoverColor="#70a1ff" className={styles.send} />
        </div>
      </div>
    );
  }
}

export default ChannelView;