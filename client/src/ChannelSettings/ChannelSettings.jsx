import React, { Component } from 'react';
import styles from './ChannelSettings.module.css';

class ChannelSettings extends Component {
  render() {
    const {id} = this.props;
    return (
      <div className={styles.ChannelSettings}>
        <input type="text" name="channelName" placeholder={id} />
        <div className={styles.colorGrid}>
          <div className={styles.colorCard}>Colour 1</div>
          <div className={styles.colorCard}>Colour 2</div>
          <div className={styles.colorCard}>Colour 3</div>
        </div>
        <button className={styles.saveButton}>Save</button>
      </div>
    );
  }
}

export default ChannelSettings;
