import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignupPage from './components/account/signup';
import LoginPage from './components/account/signin';
import HomePage from './components/views/HomePage';
import QuestionPage from './components/views/Questions';
import SingleQuestionPage from './components/views/Question';
import ProfilePage from './components/views/ProfilePage';
import AuthChecker from './utilities/redirectHandler';
import Logout from './components/account/logout';
import Notification from './components/containers/NotifyBox';
import './css/main.css';
import './css/style.css';

const signupOrRedirect = () => AuthChecker(<SignupPage />);
const loginOrRedirect = () => AuthChecker(<LoginPage />);

export default (
  <div>
    <Notification />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/account/signup" component={signupOrRedirect} />
      <Route exact path="/account/login" component={loginOrRedirect} />
      <Route exact path="/questions" component={QuestionPage} />
      <Route exact path="/questions/:id" component={SingleQuestionPage} />
      <Route exact path="/users/:name/profile" component={ProfilePage} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  </div>
);
