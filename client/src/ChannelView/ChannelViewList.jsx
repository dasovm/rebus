import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './ChannelView.module.css';

function ChannelName({loading, channels}) {
  return (
    <div className={styles.channels}>
      <div className={styles.channelList}>
        {loading ? 
        <div className={styles.channelCard}>...</div> :
        channels.map(channel => (
          <Link key={`link-${channel._id}`} to={`/channel/${channel._id}`}>
            <div key={`channel-${channel._id}`} className={styles.channelCard}>
              {channel.name.charAt(0)}
            </div>
          </Link>
        ))
      }
      <Link to="/join"><div className={styles.channelCard}><ContentAdd /></div></Link>
      </div>
    </div>
  )
}

const GET_CHANNELS = gql`
  query {
    channels {
      _id
      name
    }
  }
`;

export default graphql(GET_CHANNELS, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { loading, channels } }) => ({
    loading,
    channels,
  }),
})(ChannelName);