import React, { Component } from 'react';
import Tooltip from 'material-ui/Tooltip';
import styles from './ChannelTextBubbleRight.module.css';

export default class ChannelTextBubbleRight extends Component {
    render () {
        return  <div className={styles.channelBubbleRight}>
                    <Tooltip title={`Sent: ${this.props.sentAt}`}>
                        <p>{this.props.textString}</p>
                    </Tooltip>
                    <Tooltip title={this.props.userName}>
                        <img className={styles.img} alt="" src={this.props.imgPath} />
                    </Tooltip>
                </div>
    }

}