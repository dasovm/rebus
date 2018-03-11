import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Grow from 'material-ui/transitions/Grow';
import styles from './HomeChannelGrid.module.css';
import Loading from '../Loading/Loading';
import { standardColor } from '../colors.js';

function getBackgroundColor(color) {
  if(color){
    return color;
  } else {
    return standardColor;
  }
}

function HomeChannelGrid({ loading, channels }) {
  if (loading) return <Loading />
  else {
    return (
      <div className={styles.channelList}>
        {channels.map((channel, index) => 
          <Grow key={`grow-${channel._id}`} in={!loading} {...(!loading ? { timeout: (index + 1) * 200 } : {})}>
            <Link key={`link-${channel._id}`} to={`/channel/${channel._id}`} className={styles.channelLink}>
              <div key={`grid-${channel._id}`} style={{backgroundColor: getBackgroundColor(channel.color)}} className={styles.channelCard}>{channel.name}</div>
            </Link>
          </Grow>
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
      color
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