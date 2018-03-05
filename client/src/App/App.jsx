import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import Channel from '../Channel/Channel';
import Login from '../Login/Login';
import JoinChannel from '../JoinChannel/JoinChannel';
import { AUTH_TOKEN } from '../constants';


function isLoggedIn() {
  return localStorage.getItem(AUTH_TOKEN) != null;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
      // Check if we are signed in
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <PrivateRoute exact path='/' component={Home} availablePublic={false}/>
          <PrivateRoute path='/join' component={JoinChannel} availablePublic={false}/>
          <PrivateRoute path='/channel/:id' component={Channel} availablePublic={false}/>
          <Route path='/login' render={props => (
            // Check if we not are signed in
            !isLoggedIn() ? (
              <Login {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          )} />
        </Switch>
      </main>
    );
  }
}

export default App;
