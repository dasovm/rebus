import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './JoinChannel.module.css';
import HomeButton from '../HomeButton';
import Loading from '../Loading/Loading';

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
        console.log(res);
        this.setState({
          isLoading: false,
          snackbarMessage: 'Channel created',
          snackbarOpen: true
        });
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

  createNewChannel = async () => {
    const {createNewTextValue} = this.state;
    await this.props.createNewChannelMutation({
      variables: {
        name: createNewTextValue
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
        console.log(res);
        this.setState({
          isLoading: false,
          snackbarMessage: `Succesfully joined "${res}"`,
          snackbarOpen: true
        });
      })
      .catch(err => {
        console.log(err);
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
      console.log(res.data.joinChannel.name);
      return res.data.joinChannel.name;
    });
  }

  snackbarClose = () => {
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
                <TextField hintText="name" className={styles.testTextField} value={this.state.createNewTextValue} onChange={this.handleCreateNewTextChange} />
                <FlatButton label="Create" backgroundColor="#2ed573" hoverColor="#7bed9f" className={styles.submitButton} onClick={this.onCreateNewClick} />
              </div>
            </div>
            <p>or</p>
            <div className={styles.joinBlock}>
              <h3>Join existing channel:</h3>
              <div className={styles.textField}>
                <TextField hintText="id" value={this.state.joinChannelTextValue} onChange={this.handleJoinChannelTextChange} />
                <FlatButton label="Join" backgroundColor="#2ed573" hoverColor="#7bed9f" className={styles.submitButton} onClick={this.onJoinChannelClick} />
              </div>
            </div>
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={5000}
            onRequestClose={this.snackbarClose} />
        </div>
      )
    }
  }
}

const CREATE_NEW_CHANNEL = gql`
  mutation CreateNewChannel($name: String!) {
    createChannel(name: $name) {
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
