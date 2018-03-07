import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
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
      sendDisabled: true,
      sendingMessage: false,
      messageTextValue: '',
    }
  }

  handleMessageTextChange = (event) => {
    const messageTextValue = event.target.value;
    this.setState({
      messageTextValue,
      sendDisabled: messageTextValue.length === 0,
    });
  }

  onSendClick = (event) => {
    this.setState({
      sendingMessage: true,
    });
    this.sendMessage().then(() => {
      this.setState({
        sendingMessage: false,
        messageTextValue: ''
      });
    });
  }

  sendMessage = async () => {
    const { messageTextValue } = this.state;
    await this.props.sendTextMessageMutation({
      variables: {
        channelId: this.props.channelId,
        textContent: messageTextValue
      }
    });
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
            <Button color="primary" className={styles.settings} component={Link} to={`/channel/${this.props.channelId}/settings`}>
              {/* backgroundColor="#1e90ff" hoverColor="#70a1ff" */}
              Settings
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <ChannelMessageList channelId={this.props.channelId} />
        </div>
        <div className={styles.input}>
          <TextField placeholder="Write message here..." className={styles.textField} value={this.state.messageTextValue} onChange={this.handleMessageTextChange} />
          <Button color="primary" className={styles.send} disabled={this.state.sendDisabled} onClick={this.onSendClick}>
            {/* backgroundColor="#1e90ff" hoverColor="#70a1ff" */}
            {this.state.sendingMessage ? "Loading..." : "Send"}
          </Button>
        </div>
      </div>
    );
  }
}

const SEND_TEXT_MESSAGE_MUTATION = gql`
  mutation SendTextMessage($channelId: ID!, $textContent: String!) {
    sendMessage(
      channelId: $channelId, 
      message: {
        type: TEXT
        text: $textContent
      }
    ) {
      _id
    }
  }
`;

export default graphql(SEND_TEXT_MESSAGE_MUTATION, {name: 'sendTextMessageMutation'})(ChannelView);