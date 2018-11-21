import React from 'react';
import { Route, Switch } from 'react-router-dom';


import SignupPage from './components/account/signup';
import LoginPage from './components/account/signin';

export default (
  <div>
    <Switch>
      <Route exact path="/account/signup" component={SignupPage} />
      <Route exact path="/account/login" component={LoginPage} />
    </Switch>
  </div>
);
