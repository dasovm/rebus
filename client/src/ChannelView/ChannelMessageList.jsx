import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './ChannelView.module.css';
import Loading from '../Loading/Loading';

function ChannelMessageList({loading, channel}) {
  if (loading) return <Loading />
  else {
    const { messages } = channel.messages;
    console.log(messages);
    return (
      <div className={styles.contentWrapper}>
      {messages.map(message => (
        <div key={`msg-${message._id}`} className={styles.channelBubbleLeft}>
          <img key={`img-${message._id}`} src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
          <p key={`text-${message._id}`}>{message.content.text}</p>
        </div>
      ))}
        {/* <div className={styles.channelBubbleLeft}>
          <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
          <p>Hello world!</p>
        </div>
        <div className={styles.channelBubbleRight}>
          <p>Hey there!</p>
          <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
        </div> */}
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