import React from 'react';
import { Route, Switch } from 'react-router-dom';


import SignupPage from './components/account/signup';
import LoginPage from './components/account/signin';
import HomePage from './components/views/HomePage';
import QuestionPage from './components/views/Questions';
import AuthChecker from './utilities/redirectHandler';
import Logout from './components/account/logout';

const signupOrRedirect = () => AuthChecker(<SignupPage />);
const loginOrRedirect = () => AuthChecker(<LoginPage />);

export default (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/account/signup" component={signupOrRedirect} />
      <Route exact path="/account/login" component={loginOrRedirect} />
      <Route exact path="/questions" component={QuestionPage} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  </div>
);
