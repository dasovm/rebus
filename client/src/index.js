import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ApolloLink, split } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_TOKEN } from './constants';

const httpLink = new HttpLink({ uri: `http://localhost:3000/graphql` });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      Authorization: authorizationHeader,
    },
  })
  return forward(operation)
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3000/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN),
//     },
//   }
// })

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   httpLinkWithAuthToken,
// )

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
