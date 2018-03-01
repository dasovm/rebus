import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
<MuiThemeProvider>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
