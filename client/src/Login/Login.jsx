import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Snackbar from 'material-ui/Snackbar';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { withRouter } from "react-router-dom";
import styles from './Login.module.css';
import Loading from '../Loading/Loading';
import { AUTH_TOKEN } from '../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      fbLoading: false,
      fbToken: '',
    };
  }

  responseFacebook = (response) => {
    this.setState({
      fbToken: response.accessToken,
      fbLoading: true
    });
    this.confirmToken().then(() => {
      this.props.history.push('/');
    });
  }

  onFailure = () => {
    this.setState({
      snackbarOpen: true,
    });
  }

  snackbarClose = (event, reason) => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    const loginBlock = (
      <div className={styles.Login}>
        <h1 className={styles.title}>Rebus</h1>
        <h3 className={styles.subtitle}>Login/create account</h3>
        <FacebookLogin
          appId="148998895776893"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onFailure={this.onFailure} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          message="Facebook login failed"
          autoHideDuration={5000}
          onClose={this.snackbarClose} />
      </div>
    );

    if (this.state.fbLoading) return <Loading />;
    else return loginBlock;
  }

  confirmToken = () => {
    const {fbToken} = this.state;
    return this.props.getTokenMutation({
      variables: {
        token: fbToken
      }
    }).then(result => {
      const { token } = result.data.login;
      this.saveUserData(token);
    });
  }

  saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

const GET_TOKEN_MUTATION = gql`
  mutation GetTokenMutation($token: String!) {
    login(token: $token) {
      token
    }
  }
`

export default withRouter(graphql(GET_TOKEN_MUTATION, {name: 'getTokenMutation'})(Login));
