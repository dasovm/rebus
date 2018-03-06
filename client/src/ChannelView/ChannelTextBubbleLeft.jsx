import React, { Component } from 'react';
import styles from './ChannelTextBubbleLeft.module.css';

export default class ChannelTextBubbleLeft extends React.Component {
    render () {
        return  <div className={styles.channelBubbleLeft}>
                    <img className={styles.img} alt="" src={this.props.imgPath} />
                    <p>{this.props.textString}</p>
                </div>
    }

}