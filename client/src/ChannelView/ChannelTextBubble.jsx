import React, { Component } from 'react';
import Tooltip from 'material-ui/Tooltip';
import styles from './ChannelTextBubble.module.css';

export default class ChannelTextBubble extends Component {
    render () {
        return  <div className={this.props.isMe ? styles.channelBubbleRight : styles.channelBubbleLeft}>
            <Tooltip title={`Sent: ${this.props.sentAt}`}>
                <p>{this.props.textString}</p>
            </Tooltip>
            <Tooltip title={this.props.userName}>
                <img className={styles.img} alt="" src={this.props.imgPath} />
            </Tooltip>
        </div>
    }

}