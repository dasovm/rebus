import React, { Component } from 'react';
import Tooltip from 'material-ui/Tooltip';
import styles from './ChannelTextBubble.module.css';

export default class ChannelTextBubble extends Component {
    render () {
        const { content } = this.props;
        const contentBlock = content.type === 'TEXT' 
            ? <p>{content.text}</p> 
            : <p>
            {content.gifs.map((gif, index) => {
                return <img key={`img-${index+1}`} src={gif.url} alt={`Gif ${index+1}`}></img>;
            })}</p>;
        return  <div className={this.props.isMe ? styles.channelBubbleRight : styles.channelBubbleLeft}>
            <Tooltip title={`Sent: ${this.props.sentAt}`}>
                {contentBlock}
            </Tooltip>
            <Tooltip title={this.props.userName}>
                <img className={styles.img} alt="" src={this.props.imgPath} />
            </Tooltip>
        </div>
    }

}