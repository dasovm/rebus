import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';

const iconStyle = {
  icon: {
    width: 48,
    height: 48,
    color: "#2f3542"
  },
  button: {
    width: 96,
    height: 96,
    padding: 24,
  }
}

class HomeButton extends Component {
  render() {
    return (
      <IconButton component={Link} to="/" style={iconStyle.button}>
        <Icon>home</Icon>
      </IconButton>
    );
  }
}

export default HomeButton;
