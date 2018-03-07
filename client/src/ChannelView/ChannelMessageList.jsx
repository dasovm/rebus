import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './ChannelView.module.css';
import ChannelTextBubbleLeft from './ChannelTextBubbleLeft';
import ChannelTextBubbleRight from './ChannelTextBubbleRight';
import Loading from '../Loading/Loading';

function ChannelMessageList({loading, viewer, channel}) {
  if (loading) return <Loading />
  else {
    const viewerUserId = viewer.user._id;
    const { messages } = channel.messages;
    
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

const GET_CHANNEL_NAME = gql`
  query GetChannelName($channelId: ID!) {
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

export default graphql(GET_CHANNEL_NAME, {
  options: (props) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      channelId: props.channelId
    }
  }),
  props: ({ data: { loading, viewer, channel } }) => ({
    loading,
    viewer,
    channel,
  }),
})(ChannelMessageList);