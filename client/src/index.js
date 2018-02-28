import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChannelSettings from './ChannelSettings/ChannelSettings';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ChannelSettings />, document.getElementById('root'));
registerServiceWorker();
