import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../../components/account/signup';
import Signin from '../../components/account/signin';
import Logout from '../../components/account/logout';
import store from '../utilities/store';
import { signUp, logIn } from '../utilities/mockData';

afterEach(cleanup);

const signupStore = store(signUp);
const loginStore = store(logIn);

describe('Sign page', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <Signup store={{ ...signupStore, message: 'message' }} />
      </Router>,
    );
  });

  it('should handle input change events', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <Signup store={{ ...signupStore, error: 'error' }} />
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
    render(
      <Router>
        <Signin store={loginStore} />
      </Router>,
    );
  });

  it('should handle input change events', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <Signin store={loginStore} />
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
