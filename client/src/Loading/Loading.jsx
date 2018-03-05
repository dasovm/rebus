import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import styles from './Loading.module.css';

class Loading extends Component {
  render () {
    return (
    <div className={styles.Loading}>
      <h3 className={styles.subtitle}>Loading...</h3>
      <CircularProgress size={80} thickness={5} />
    </div>
    )
  }
}

export default Loading