import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';
import HomeChannelGrid from './HomeChannelGrid';
import styles from './Home.module.css';
import Loading from "../Loading/Loading";

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <h1 className={styles.title}>Active channels</h1>
        <HomeChannelGrid />
        <Button color="secondary" variant="fab" component={Link} to="/join" className={styles.addNew}>
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }
}

export default Home;