import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './JoinChannel.module.css';
import HomeButton from '../HomeButton';

class JoinChannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createNewTextValue: '',
      joinChannelTextValue: '',
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
    console.log(this.state.createNewTextValue);
  }

  onJoinChannelClick = (event) => {
    console.log(this.state.joinChannelTextValue);
  }

  render() {
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
      </div>
    );
  }
}

const CREATE_NEW_CHANNEL = gql`
  mutation CreateNewChannel($name: String!) {
    createChannel(name: $name) {
      _id
    }
  }
`;

export default graphql(CREATE_NEW_CHANNEL, {name: 'createNewChannelMutation'})(JoinChannel);
