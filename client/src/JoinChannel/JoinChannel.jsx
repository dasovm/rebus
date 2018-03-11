import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './JoinChannel.module.css';
import HomeButton from '../HomeButton';
import Loading from '../Loading/Loading';
import { randomColor } from '../colors.js'


class JoinChannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createNewTextValue: '',
      joinChannelTextValue: '',
      isLoading: false,
      snackbarOpen: false,
      snackbarMessage: ''
    };
  }

  handleCreateNewTextChange = (event) => {
    this.setState({
      createNewTextValue: event.target.value,
    });
  };

  handleJoinChannelTextChange = (event) => {
    this.setState({
      joinChannelTextValue: event.target.value,
    });
  };

  onCreateNewClick = (event) => {
    if (this.state.createNewTextValue.length <= 0) {
      this.setState({
        snackbarMessage: 'Please specify a name to create a channel',
        snackbarOpen: true
      });
    }
    else {
      this.setState({
        isLoading: true
      });
      this.createNewChannel()
      .then(res => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push(`/channel/${res.data.createChannel._id}`);
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          snackbarMessage: `Could not create channel`,
          snackbarOpen: true
        });
      });;
    }
  }

  createNewChannel = () => {
    const {createNewTextValue} = this.state;
    return this.props.createNewChannelMutation({
      variables: {
        name: createNewTextValue,
        color: randomColor
      }
    });
  }

  onJoinChannelClick = (event) => {
    if (this.state.joinChannelTextValue.length <= 0) {
      this.setState({
        snackbarMessage: 'Please specify a id to join a channel',
        snackbarOpen: true
      });
    }
    else {
      this.setState({
        isLoading: true
      });
      this.joinChannel()
      .then(res => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push(`/channel/${this.state.joinChannelTextValue}`);
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          snackbarMessage: `Could not find a channel with id: ${this.state.joinChannelTextValue}`,
          snackbarOpen: true
        });
      });
    }
  }

  joinChannel = async () => {
    const {joinChannelTextValue} = this.state;
    return await this.props.joinChannelMutation({
      variables: {
        channelId: joinChannelTextValue
      }
    }).then(res => {
      return res.data.joinChannel.name;
    });
  }

  snackbarClose = (event, reason) => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    if (this.state.isLoading) return <Loading />
    else {
      return (
        <div className={styles.JoinChannel}>
          <HomeButton />
          <div className={styles.blocks}>
            <div className={styles.newBlock}>
              <h3>Create new channel:</h3>
              <div className={styles.textField}>
                <TextField placeholder="name" className={styles.testTextField} value={this.state.createNewTextValue} onChange={this.handleCreateNewTextChange} />
                <Button variant="raised" color="primary" className={styles.submitButton} onClick={this.onCreateNewClick}>
                  Create
                </Button>
              </div>
            </div>
            <p>or</p>
            <div className={styles.joinBlock}>
              <h3>Join existing channel:</h3>
              <div className={styles.textField}>
                <TextField placeholder="id" value={this.state.joinChannelTextValue} onChange={this.handleJoinChannelTextChange} />
                <Button variant="raised" color="primary" className={styles.submitButton} onClick={this.onJoinChannelClick}>
                  Join
                </Button>
              </div>
            </div>
          </div>
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
      )
    }
  }
}

const CREATE_NEW_CHANNEL = gql`
  mutation CreateNewChannel($name: String!, $color: String) {
    createChannel(name: $name, color: $color) {
      _id
    }
  }
`;

const JOIN_CHANNEL = gql`
  mutation JoinChannel($channelId: ID!) {
    joinChannel(channelId: $channelId) {
      name
    }
  }
`;

export default compose(
  graphql(CREATE_NEW_CHANNEL, {name: 'createNewChannelMutation'}),
  graphql(JOIN_CHANNEL, {name: 'joinChannelMutation'}),
)(JoinChannel);
