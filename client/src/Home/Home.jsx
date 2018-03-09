import React, { Component } from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import HomeChannelGrid from './HomeChannelGrid';
import styles from './Home.module.css';
import { AUTH_TOKEN } from '../constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  logoutClick = (event) => {
    this.setState({ anchorEl: null });
    localStorage.removeItem(AUTH_TOKEN);
    this.props.history.push('/login');
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={styles.Home}>
        <div className={styles.headWrapper}>
          <h1 className={styles.title}>Active channels</h1>
          <div className={styles.moreIconWrapper}>
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Icon>more_vert</Icon>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.logoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
        <HomeChannelGrid />
        <Button color="secondary" variant="fab" component={Link} to="/join" className={styles.addNew}>
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }
}

export default Home;