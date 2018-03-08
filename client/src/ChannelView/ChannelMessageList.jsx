import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './ChannelView.module.css';
import ChannelTextBubbleLeft from './ChannelTextBubbleLeft';
import ChannelTextBubbleRight from './ChannelTextBubbleRight';
import Loading from '../Loading/Loading';

class ChannelMessageList extends Component {
  componentDidMount() {
    this.subscribeToNewMessages();
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
          if (message.sender._id === viewerUserId) {
            return <ChannelTextBubbleRight key={`msg-${message._id}`}
              imgPath={message.sender.picture}
              textString={message.content.text}
              sentAt={message.sentAt}
              userName={message.sender.name} />
          } else {
            return <ChannelTextBubbleLeft key={`msg-${message._id}`} imgPath={message.sender.picture} textString={message.content.text} />
          }
        })}
        </div>
      )
    }
  }

  subscribeToNewMessages = () => {
    this.props.getMessageList.subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: {
        channelId: this.props.channelId,
      },
      updateQuery: (previous, { subscriptionData }) => {
        console.log(previous);
        console.log(subscriptionData);
        const newAllMessages = [
          ...previous.channel.messages.messages,
          subscriptionData.data.message,
        ];
        const result = {
          ...previous,
          channel: {
            messages: {
              messages: newAllMessages
            }
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
      }
    }
  }
`;

export default graphql(GET_MESSAGE_LIST, {
  name: 'getMessageList',
  options: ownProps => {
    const { channelId } = ownProps;
    return {
      variables: { channelId },
    }
  }
})(ChannelMessageList);