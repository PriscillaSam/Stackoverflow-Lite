import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../../components/account/signup';
import Signin from '../../components/account/signin';
import Logout from '../../components/account/logout';
import store from '../utilities/store';
import {
  signUp, signUp2, logIn, logIn2,
} from '../utilities/mockData';

afterEach(cleanup);

const signupStore = store(signUp);
const signupStore2 = store(signUp2);
const loginStore = store(logIn);
const loginStore2 = store(logIn2);

describe('Signup page', () => {
  it('should render without crashing', () => {
    localStorage.setItem('token', 'token');
    render(
      <Router>
        <Signup store={signupStore2} />
      </Router>,
    );
    localStorage.clear();
  });

  it('should handle input change events', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <Signup store={signupStore} />
      </Router>,
    );

    const input = getByPlaceholderText('your name');
    const form = getByTestId('signup-form');
    fireEvent.change(input, { target: { value: 'My name' } });
    fireEvent.submit(form);
  });
});

describe('Login page', () => {
  it('should render without crashing', () => {
    localStorage.setItem('token', 'token');
    render(
      <Router>
        <Signin store={loginStore} />
      </Router>,
    );
    localStorage.clear();
  });

  it('should render without crashing', () => {
    render(
      <Router>
        <Signin store={loginStore} />
      </Router>,
    );
  });

  it('should handle input change events', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <Signin store={loginStore2} />
      </Router>,
    );

    const input = getByPlaceholderText('your email');
    const form = getByTestId('login-form');
    fireEvent.change(input, { target: { value: 'My email' } });
    fireEvent.submit(form);
  });
});

describe('Logout component', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <Logout />
      </Router>,
    );
  });
});
