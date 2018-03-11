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

function getContrastYIQ(hexcolor) {
  if(hexcolor === null) { return 'black' }
  if (hexcolor.indexOf('#') === 0) {
    hexcolor = hexcolor.slice(1);
  }
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

function HomeChannelGrid({ loading, viewer }) {
  if (loading) return <Loading />
  else {
    const {channels} = viewer.user;
    return (
      <div className={styles.channelList}>
        {channels.map((channel, index) => 
          <Grow key={`grow-${channel._id}`} in={!loading} {...(!loading ? { timeout: (index + 1) * 200 } : {})}>
            <Link key={`link-${channel._id}`} to={`/channel/${channel._id}`} className={styles.channelLink}>
              <div key={`grid-${channel._id}`} style={{backgroundColor: getBackgroundColor(channel.color), color: getContrastYIQ(channel.color)}} className={styles.channelCard}>{channel.name}</div>
            </Link>
          </Grow>
        )}
      </div>
    );  
  }
}

const GET_CHANNELS_QUERY = gql`
  query {
    viewer {
      user {
        channels {
          name
          _id
          color
        }
      }
    }
  }
`;

export default graphql(GET_CHANNELS_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { loading, viewer } }) => ({
    loading,
    viewer,
  }),
})(HomeChannelGrid);