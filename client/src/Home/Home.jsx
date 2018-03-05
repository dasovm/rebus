import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <h1 className={styles.title}>Active channels</h1>
        <div className={styles.channelList}>
          <div className={styles.channelCard}>Channel #1</div>
          <div className={styles.channelCard}>Channel #2</div>
          <div className={styles.channelCard}>Channel #3</div>
          <div className={styles.channelCard}>Channel #4</div>
          <div className={styles.channelCard}>Channel #5</div>
          <div className={styles.channelCard}>Channel #6</div>
          <div className={styles.channelCard}>Channel #7</div>
          <div className={styles.channelCard}>Channel #8</div>
          <div className={styles.channelCard}>Channel #9</div>
        </div>
        <FloatingActionButton href="/join" className={styles.addNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const GET_CHANNELS_QUERY = gql`
  query {
    channels {
      name
      _id
    }
  }
`

export default graphql(GET_CHANNELS_QUERY, {name: 'getChannelsQuery'})(Home);