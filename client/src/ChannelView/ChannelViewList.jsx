import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Icon from 'material-ui/Icon';
import styles from './ChannelView.module.css';
import HomeButton from '../HomeButton';
import { standardColor } from '../colors.js';

function getBackgroundColor(color) {
  if (color) {
    return color;
  } else {
    return standardColor;
  }
}

function ChannelViewList({loading, viewer, channel}) {
  return (
    <div className={styles.channels} style={{backgroundColor: loading || typeof channel === "undefined" ? '#fff' : getBackgroundColor(channel.color)}}>
      <div className={styles.channelList}>
        <div className={styles.channelCard} style={{marginTop: '0'}}>
          <HomeButton />
        </div>
        {loading || typeof viewer === "undefined" ? 
        <div className={styles.channelCard}>...</div> :
        viewer.user.channels.map(channel => (
          <Link key={`link-${channel._id}`} to={`/channel/${channel._id}`}>
            <div key={`channel-${channel._id}`} className={styles.channelCard}>
              {channel.name.charAt(0)}
            </div>
          </Link>
        ))
      }
      <Link to="/join"><div className={styles.channelCard}><Icon>add</Icon></div></Link>
      </div>
    </div>
  )
}

const GET_CHANNELS = gql`
  query GetChannelAndColor($channelId: ID!) {
    channel (channelId: $channelId) {
      color
    }
    viewer {
      user {
        _id
        channels {
          name
          _id
        }
      }
    }
  }
`;

export default 
  graphql(GET_CHANNELS, {
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
  })(ChannelViewList);