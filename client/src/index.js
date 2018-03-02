import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApolloClient from 'apollo-boost';
import { ApolloLink, split } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_TOKEN } from './constants';

const httpLink = new HttpLink({ uri: `http://localhost:3000` });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
});

ReactDOM.render(
<MuiThemeProvider>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
