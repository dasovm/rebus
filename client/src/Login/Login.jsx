import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Snackbar from 'material-ui/Snackbar';
import styles from './Login.module.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
    };
  }

  responseFacebook = (response) => {
    // Skicka response till server och få JWT token tillbaka
    console.log(response);
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
    return (
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
  }
}

export default Login;
