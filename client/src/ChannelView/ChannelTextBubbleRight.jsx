import React, { Component } from 'react';
import styles from './ChannelTextBubbleRight.module.css';

export default class ChannelTextBubbleRight extends React.Component {
    render () {
        return  <div className={styles.channelBubbleRight}>
                    <p>{this.props.textString}</p>
                    <img className={styles.img} alt="" src={this.props.imgPath} />
                </div>
    }

}