import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import Login from '../Login/Login';
import JoinChannel from '../JoinChannel/JoinChannel';

const isLoggedIn = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
      isLoggedIn ? (
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
          <PrivateRoute path='/chat/:id' component={Chat} availablePublic={false}/>
          <Route path='/login' render={props => (
            !isLoggedIn ? (
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
