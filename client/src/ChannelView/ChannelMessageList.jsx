import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './ChannelView.module.css';
import ChannelTextBubble from './ChannelTextBubble';
import Loading from '../Loading/Loading';

class ChannelMessageList extends Component {
  componentDidMount() {
    this.subscribeToNewMessages(this.props.channelId);
  }

  componentWillReceiveProps({channelId}) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) this.unsubscribe();
      this.subscribeToNewMessages(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    if (this.props.getMessageList.loading) return <Loading />
    else {
      const viewerUserId = this.props.getMessageList.viewer.user._id;
      const { messages } = this.props.getMessageList.channel.messages;

      return (
        <div className={styles.contentWrapper}>
        {messages.map(message => {
          // Check if message are from viewer
          return <ChannelTextBubble key={`msg-${message._id}`}
              imgPath={message.sender.picture}
              content={message.content}
              sentAt={message.sentAt}
              userName={message.sender.name}
              isMe={message.sender._id === viewerUserId} />
        })}
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      )
    }
  }

  scrollToBottom() {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  subscribeToNewMessages = channelId => {
    this.unsubscribe = this.props.getMessageList.subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: {
        channelId: channelId,
      },
      updateQuery: (previous, { subscriptionData }) => {
        console.log(subscriptionData);
        const newAllMessages = [
          ...previous.channel.messages.messages,
          subscriptionData.data.message,
        ];
        const result = {
          ...previous,
          channel: {
            messages: {
              messages: newAllMessages,
              __typename: 'MessageConnection'
            },
            __typename: 'Channel'
          }
        }
        return result;
      }
    });
  }
}

const GET_MESSAGE_LIST = gql`
  query getMessageList($channelId: ID!) {
    viewer {
      user {
        _id
      }
    }
    channel(channelId: $channelId) {
      messages {
        messages {
          _id
          sentAt
          sender {
            _id
            name
            picture
          }
          content {
            type
            ... on Text {
              text
            }
            ... on Rebus {
              gifs {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription onNewMessage($channelId: ID!) {
    message(channelId: $channelId) {
      _id
      sentAt
      sender {
        _id
        name
        picture
      }
      content {
        type
        ... on Text {
          text
        }
        ... on Rebus {
          gifs {
            url
          }
        }
      }
    }
  }
`;

export default graphql(GET_MESSAGE_LIST, {
  name: 'getMessageList',
  options: ownProps => {
    const { channelId } = ownProps;
    return {
      options: {
        fetchPolicy: 'network-only',
      },
      variables: { channelId },
    }
  }
})(ChannelMessageList);