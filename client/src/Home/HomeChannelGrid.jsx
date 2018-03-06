import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './HomeChannelGrid.module.css';
import Loading from '../Loading/Loading';

function HomeChannelGrid({ loading, channels }) {
  if (loading) return <Loading />
  else {
    return (
      <div className={styles.channelList}>
        {channels.map(channel => 
        <Link key={`link-${channel._id}`} to={`/channel/${channel._id}`} className={styles.channelLink}>
          <div key={`grid-${channel._id}`} className={styles.channelCard}>{channel.name}</div>
        </Link>
        )}
      </div>
    );
  }
}

const GET_CHANNELS_QUERY = gql`
  query {
    channels {
      name
      _id
    }
  }
`;

export default graphql(GET_CHANNELS_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { loading, channels } }) => ({
    loading,
    channels,
  }),
})(HomeChannelGrid);