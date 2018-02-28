import React, { Component } from 'react';
import styles from './Login.module.css';

class Login extends Component {
  render() {
    return (
      <div className={styles.Login}>
        <h1 className={styles.title}>Rebus</h1>
        <h3 className={styles.subtitle}>Login/create account</h3>
        <button className={styles.button} >
          Login with Facebook
        </button>
      </div>
    );
  }
}

export default Login;
