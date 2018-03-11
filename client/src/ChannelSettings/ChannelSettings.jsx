import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './ChannelSettings.module.css';
import ChannelName from '../ChannelView/ChannelName';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { colors } from '../colors.js';

class ChannelSettings extends Component {

  render() {
    const {id} = this.props;
    return (
      <div className={styles.ChannelSettings}>
        <ChannelName channelId={id} />
        {this.props.loading ? 
          <p>Loading...</p> :
          <div className={styles.colorGrid}>
          {colors.map(color => {
            const channelColor = this.props.channel.color;
            return <div style={{fontWeight: color === channelColor ? 'bold' : 'normal'}} className={styles.colorCard}>{color}</div>
          })}
        </div>}
        <button className={styles.saveButton}>Save</button>
      </div>
    );
  }
}

const GET_CHANNEL_NAME = gql`
  query GetChannelName($channelId: ID!) {
    channel (channelId: $channelId) {
      color
    }
  }
`;

export default 
graphql(GET_CHANNEL_NAME, {
  options: (props) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      channelId: props.id
    }
  }),
  props: ({ data: { loading, channel } }) => ({
    loading,
    channel,
  }),
})(ChannelSettings);