import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/Button';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
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
      anchorEl: null,
    }
  }

  handleMessageTextChange = (event) => {
    const messageTextValue = event.target.value;
    this.setState({
      messageTextValue,
      sendDisabled: messageTextValue.length === 0,
    });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (!this.state.sendDisabled) {
        this.onSendClick(event);
      }
    }
  }

  onSendClick = (event) => {
    this.setState({
      sendingMessage: true,
    });
    this.sendMessage().then(() => {
      this.setState({
        sendingMessage: false,
        messageTextValue: '',
        sendDisabled: true,
      });
    });
  }

  sendMessage = () => {
    const { messageTextValue } = this.state;
    const messageType = messageTextValue.substring(0, 7) === '/rebus ' ? 'REBUS' : 'TEXT';
    const textContent = messageType === 'REBUS' ? messageTextValue.substring(7) : messageTextValue;
    return this.props.sendTextMessageMutation({
      variables: {
        channelId: this.props.channelId,
        textContent,
        messageType,
      }
    });
  }

  leaveChannelClick = (event) => {
    this.setState({ anchorEl: null });
    this.leaveChannel().then(() => {
      this.props.history.push('/login');
    }).bind(this);
  }

  leaveChannel = async () => {
    return this.props.leaveChannelMutation({
      variables: {
        channelId: this.props.channelId,
      }
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={styles.Channel}>
        <ChannelViewList channelId={this.props.channelId} />
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <ChannelName channelId={this.props.channelId} />
            <h2 className={styles.h2}><strong>id</strong> {this.props.channelId}</h2>
          </div>
          <div>
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Icon>more_vert</Icon>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem component={Link} to={`/channel/${this.props.channelId}/settings`} onClick={this.handleClose}>Settings</MenuItem>
              <MenuItem component={Link} to='/' onClick={this.leaveChannelClick}>Leave channel</MenuItem>
          </Menu>
          </div>
        </div>
        <div className={styles.content}>
          <ChannelMessageList channelId={this.props.channelId} />
        </div>
        <div className={styles.input}>
          <TextField placeholder="Write message here..." className={styles.textField} value={this.state.messageTextValue} onChange={this.handleMessageTextChange} onKeyPress={this.onKeyPress} />
          <Button color="primary" className={styles.send} disabled={this.state.sendDisabled} onClick={this.onSendClick}>
            {this.state.sendingMessage ? "Loading..." : "Send"}
          </Button>
        </div>
      </div>
    );
  }
}

const SEND_TEXT_MESSAGE_MUTATION = gql`
  mutation SendTextMessage($channelId: ID!, $textContent: String!, $messageType: MessageInputType!) {
    sendMessage(
      channelId: $channelId,
      message: {
        type: $messageType
        text: $textContent
      }
    ) {
      _id
    }
  }
`;

const LEAVE_CHANNEL_MUTATION = gql`
  mutation LeaveChannel($channelId: ID!) {
    leaveChannel(
      channelId: $channelId,
    ) {
      _id
    }
  }
`;

export default compose(
  graphql(SEND_TEXT_MESSAGE_MUTATION, {name: 'sendTextMessageMutation'}),
  graphql(LEAVE_CHANNEL_MUTATION, {name: 'leaveChannelMutation'}),
)(ChannelView);