import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ChatView.module.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class ChatView extends Component {
  render() {
    const {id} = this.props;
    return (
      <div className={styles.Chat}>
        <div className={styles.chats}>
          <div className={styles.chatList}>
            <div className={styles.chatCard}>#1</div>
            <div className={styles.chatCard}>#2</div>
            <div className={styles.chatCard}>#3</div>
            <div className={styles.chatCard}>#4</div>
            <div className={styles.chatCard}>#5</div>
            <div className={styles.chatCard}>#6</div>
            <div className={styles.chatCard}>#7</div>
            <div className={styles.chatCard}>#8</div>
            <Link to="/join"><div className={styles.chatCard}><ContentAdd /></div></Link>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <h1 className={styles.h1}>ChatName</h1>
            <h2 className={styles.h2}>id #12351</h2>
          </div>
          <div>
            <FlatButton label="Leave Channel" backgroundColor="#ff4757" hoverColor="#ff6b81" className={styles.leaveChannel} />
            <FlatButton label="Settings" backgroundColor="#1e90ff" hoverColor="#70a1ff" className={styles.settings} href={'/chat/' + id + '/settings'} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>Hello world!</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Hey there!</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>So, what are your plans for tonight?</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Drinkin'</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>Hello world!</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Hey there!</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>So, what are your plans for tonight?</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Drinkin'</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>Hello world!</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Hey there!</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>So, what are your plans for tonight?</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Drinkin'</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>Hello world!</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Hey there!</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>So, what are your plans for tonight?</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Drinkin'</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>Hello world!</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Hey there!</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
            <div className={styles.chatBubbleLeft}>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20229820_10211670744017796_2273206541262228120_o.jpg?oh=ae2637a711bce226d810c7da7308f881&oe=5B0D4016" className={styles.img} alt="" />
              <p>So, what are your plans for tonight?</p>
            </div>
            <div className={styles.chatBubbleRight}>
              <p>Drinkin'</p>
              <img src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/21032788_10208135022812358_125653935638769038_n.jpg?oh=ffebe15e58374191be718980c1c4468a&oe=5B0BAA17" className={styles.img} alt="" />
            </div>
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

export default ChatView;
