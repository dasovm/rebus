import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './ChannelView.module.css';
import ChannelTextBubbleLeft from './ChannelTextBubbleLeft';
import ChannelTextBubbleRight from './ChannelTextBubbleRight';
import Loading from '../Loading/Loading';

function ChannelMessageList({loading, channel}) {
  if (loading) return <Loading />
  else {
    const { messages } = channel.messages;
    console.log(messages);
    return (
      <div className={styles.contentWrapper}>
      {messages.map(message => (
        <ChannelTextBubbleLeft key={`msg-${message._id}`} imgPath={"https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016"} textString={message.content.text} />
      ))}
      </div>
    )
  }
}

const GET_CHANNEL_NAME = gql`
  query GetChannelName($channelId: ID!) {
    channel(channelId: $channelId) {
      messages {
        messages {
          content {
            type
            ... on Text {
              text
            }
          }
          sentAt
          _id
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
  props: ({ data: { loading, channel } }) => ({
    loading,
    channel,
  }),
})(ChannelMessageList);