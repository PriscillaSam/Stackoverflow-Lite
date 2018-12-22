import React from 'react';
import { Route, Switch } from 'react-router-dom';


import SignupPage from './components/account/signup';
import LoginPage from './components/account/signin';
import HomePage from './components/views/HomePage';
import AuthChecker from './utilities/redirectHandler';

const signupOrRedirect = () => AuthChecker(<SignupPage />);

const loginOrRedirect = () => AuthChecker(<LoginPage />);

export default (
  <div>
    <Switch>
      <Route exact path="/account/signup" component={signupOrRedirect} />
      <Route exact path="/account/login" component={loginOrRedirect} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </div>
);
