import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './ChannelSettings.module.css';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { colors, randomColor } from '../colors.js';

class ChannelSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTextValue: null,
      isLoading: false,
      color: null,
      snackbarOpen: false,
      snackbarMessage: ''
    };
  }

  componentDidUpdate() {
    if (!this.props.loading) {
      if (this.state.color === null) {
        this.setState({
          color: this.props.channel.color,
        });
      }
      if (this.state.updateTextValue === null) {
        this.setState({
          updateTextValue: this.props.channel.name,
        });
      }
    }
  }

  snackbarClose = (event, reason) => {
    this.setState({
      snackbarOpen: false,
    });
  };

  handleUpdateTextChange = (event) => {
    this.setState({
      updateTextValue: event.target.value,
    });
  };

  onUpdateChannelClick = (event) => {
    if (this.state.updateTextValue.length <= 0) {
      this.setState({
        snackbarMessage: 'Please specify a name to update a channel',
        snackbarOpen: true
      });
    }
    this.setState({
      isLoading: true
    });
    this.updateChannel()
      .then(res => {
        this.setState({
          isLoading: false,
          color: res,
          snackbarMessage: `${this.state.updateTextValue} channel updated`,
          snackbarOpen: true
        });
      }
    ).catch(err => {
      this.setState({
        isLoading: false,
        snackbarMessage: 'Could not update channel',
        snackbarOpen: true
      });
    });
  }

  updateChannel = async () => {
    return await this.props.updateChannelMutation({
      variables: {
        channelId: this.props.id,
        name: this.state.updateTextValue,
        color: randomColor
      }
    }).then(res => {
      return res.data.updateChannel.color;
    });
  }

  render() {
    const {id} = this.props;
    return (
      <div className={styles.ChannelSettings}>
        {this.state.updateTextValue === null ?
          <p>Loading...</p> :
          <TextField placeholder="name" value={this.state.updateTextValue} onChange={this.handleUpdateTextChange} />
        }
        {this.props.loading ? 
          <p>Loading...</p> :
          <div className={styles.colorGrid}>
          {colors.map(color => {
            const channelColor = this.state.color;
            return <div style={{fontWeight: color === channelColor ? 'bold' : 'normal'}} className={styles.colorCard}>{color}</div>
          })}
        </div>}
        <Button variant="raised" color="primary" className={styles.submitButton} onClick={this.onUpdateChannelClick}>
          {this.state.isLoading ? 'Loading...' : 'Save'}
        </Button>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={5000}
            onClose={this.snackbarClose} />
      </div>
    );
  }
}

const UPDATE_CHANNEL = gql`
  mutation UpdateChannel($channelId: ID!, $name: String, $color: String) {
    updateChannel(channelId: $channelId, name: $name, color: $color) {
      _id
      color
    }
  }
`;

const GET_CHANNEL_NAME = gql`
  query GetChannelName($channelId: ID!) {
    channel (channelId: $channelId) {
      color
      name
    }
  }
`;

export default compose(
  graphql(UPDATE_CHANNEL, {name: 'updateChannelMutation'}),
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
  }))(ChannelSettings);