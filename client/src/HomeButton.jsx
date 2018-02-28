import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const iconStyle = {
  icon: {
    width: 48,
    height: 48,
    color: "#2f3542",
  },
  button: {
    float: "left",
    position: "fixed",
    width: 96,
    height: 96,
  }
}

class HomeButton extends Component {
  render() {
    return (
      <IconButton href="/" tooltip="Home" iconStyle={iconStyle.icon} styles={iconStyle.button}>
        <ActionHome />
      </IconButton>
    );
  }
}

export default HomeButton;
