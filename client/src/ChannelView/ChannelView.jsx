import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ChannelTextBubbleLeft from './ChannelTextBubbleLeft';
import ChannelTextBubbleRight from './ChannelTextBubbleRight';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styles from './ChannelView.module.css';
import ChannelName from './ChannelName';

class ChannelView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      channelId: props.channelId,
      channelNameLoading: true,
      channelName: ''
    }
  }

  componentDidMount() {
    
  }


  render() {
    return (
      <div className={styles.Channel}>
        <div className={styles.channels}>
          <div className={styles.channelList}>
            <div className={styles.channelCard}>#1</div>
            <div className={styles.channelCard}>#2</div>
            <div className={styles.channelCard}>#3</div>
            <div className={styles.channelCard}>#4</div>
            <div className={styles.channelCard}>#5</div>
            <div className={styles.channelCard}>#6</div>
            <div className={styles.channelCard}>#7</div>
            <div className={styles.channelCard}>#8</div>
            <Link to="/join"><div className={styles.channelCard}><ContentAdd /></div></Link>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <ChannelName channelId={this.state.channelId} />
            <h2 className={styles.h2}>id {this.state.channelId}</h2>
          </div>
          <div>
            <FlatButton label="Leave Channel" backgroundColor="#ff4757" hoverColor="#ff6b81" className={styles.leaveChannel} />
            <FlatButton label="Settings" backgroundColor="#1e90ff" hoverColor="#70a1ff" className={styles.settings} href={'/channel/' + this.state.channelId + '/settings'} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <ChannelTextBubbleLeft imgPath={"https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016"} textString={"Hej"} />
            <ChannelTextBubbleRight imgPath={"https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17"} textString={"Hejdå"} />
          </div>
        </div>
        <div className={styles.input}>
          <TextField hintText="Write message here..." className={styles.textField} />
          <FlatButton label="Send" backgroundColor="#1e90ff" hoverColor="#70a1ff" className={styles.send} />
        </div>
      </div>
    );
  }
}

export default ChannelView;