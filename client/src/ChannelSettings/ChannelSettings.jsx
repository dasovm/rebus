import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './ChannelSettings.module.css';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';
import { colors } from '../colors.js';
import { firstNames, lastNames } from '../names.js';

const iconStyle = {
  icon: {
    width: 48,
    height: 48,
    color: "#2f3542"
  },
  button: {
    width: 96,
    height: 96,
    padding: 24,
  }
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
  
  generateName = (event) => {
    this.setState({
      updateTextValue: capFirst(firstNames[getRandomInt(0, firstNames.length)]) + ' ' + capFirst(lastNames[getRandomInt(0, lastNames.length)]),
    });
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
        color: this.state.color
      }
    }).then(res => {
      return res.data.updateChannel.color;
    });
  }

  selectColor = (color) => {
    this.setState({
      color,
    });
  }

  render() {
    const {id} = this.props;
    return (
      <div className={styles.ChannelSettings}>
        <IconButton component={Link} to={`/channel/${id}`} style={iconStyle.button}>
          <Icon>arrow_back</Icon>
        </IconButton>
        {this.state.updateTextValue === null ?
          <p>Loading...</p> :
          <TextField placeholder="name" value={this.state.updateTextValue} onChange={this.handleUpdateTextChange} className={styles.textField} />
        }
        <Button className={styles.generateNameButton} onClick={this.generateName}>Randomize a name!</Button>

        {this.props.loading ? 
          <p>Loading...</p> :
          <div className={styles.colorGrid}>
          {colors.map(color => {
            const channelColor = this.state.color;
            return <div style={{transform: color === channelColor ? 'scale(0.9)' : 'scale(1)', backgroundColor: color}} key={color} className={styles.colorCard} onClick={() => this.selectColor(color)}>{color}</div>
          })}
        </div>}
        <Button variant="raised" color="primary" className={styles.saveButton} onClick={this.onUpdateChannelClick}>
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