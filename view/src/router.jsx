import React from 'react';
import { Route, Switch } from 'react-router-dom';


import AuthForm from './components/account/signup';

export default (
  <div>
    <Switch>
      <Route exact path="/account/signup" component={AuthForm} />
    </Switch>
  </div>
);
