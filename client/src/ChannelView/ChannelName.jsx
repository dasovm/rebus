import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './ChannelView.module.css';

function ChannelName({loading, channel}) {
  if (loading) return <h1 className={styles.h1}>Loading...</h1>
  else return <h1 className={styles.h1}>{channel.name}</h1>
}

const GET_CHANNEL_NAME = gql`
  query GetChannelName($channelId: ID!) {
    channel (channelId: $channelId) {
      name
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
})(ChannelName);