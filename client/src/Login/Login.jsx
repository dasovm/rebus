import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import styles from './Login.module.css';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      fbLoading: false,
    };
  }

  responseFacebook = (response) => {
    // Skicka response till server och få JWT token tillbaka
    this.setState({
      fbLoading: true,
    });
    const { accessToken } = response.accessToken;
    const GET_TOKEN = gql`
    mutation {
      login(token: "${accessToken}") {
        token
      }
    }`;

    const res = graphql(GET_TOKEN);
    console.log(res);

  }

  onFailure = () => {
    this.setState({
      snackbarOpen: true,
    });
  }

  snackbarClose = () => {
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
          autoLoad={true}
          cookie={true}
          xfbml={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onFailure={this.onFailure} />
        <Snackbar
          open={this.state.snackbarOpen}
          message="Facebook login failed"
          autoHideDuration={4000}
          onRequestClose={this.snackbarClose} />
      </div>
    );

    const loadingBlock = (
      <div className={styles.Login}>
        <h3 className={styles.subtitle}>Loading...</h3>
        <CircularProgress size={80} thickness={5} />
      </div>
    );

    if (this.fbLoading) return loadingBlock;
    else return loginBlock;
  }
}

export default Login;
