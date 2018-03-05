import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import HomeChannelGrid from './HomeChannelGrid';
import styles from './Home.module.css';
import Loading from "../Loading/Loading";

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <h1 className={styles.title}>Active channels</h1>
        <HomeChannelGrid />
        <FloatingActionButton href="/join" className={styles.addNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default Home;