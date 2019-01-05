import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../../components/views/ProfilePage';
import store from '../utilities/store';
import { userProfile, userProfile2 } from '../utilities/mockData';

afterEach(cleanup);

const userStore = store(userProfile);
const userStore2 = store(userProfile2);


describe('Profile page', () => {
  localStorage.setItem('token', 'token');
  localStorage.setItem('name', 'Priscilla Sam-Iduh');

  it('should render without crashing if user is logged in', () => {
    render(
      <Router>
        <ProfilePage store={userStore2} />
      </Router>,
    );
  });
});

describe('Profile page', () => {
  it('should post a question', () => {
    const { getByTestId } = render(
      <Router>
        <ProfilePage store={userStore2} />
      </Router>,
    );

    const input = getByTestId('question-input');
    const form = getByTestId('question-form');

    fireEvent.change(input, { target: { value: 'A new Question' } });
    fireEvent.submit(form);
  });
});

describe('Profile page', () => {
  it('should post a question', () => {
    const { getByTestId } = render(
      <Router>
        <ProfilePage store={userStore} />
      </Router>,
    );

    const btn1 = getByTestId('2');
    fireEvent.click(btn1);

    const confirmBtn = getByTestId('confirmBtn');
    fireEvent.click(confirmBtn);

    fireEvent.click(btn1);
    const cancelBtn = getByTestId('cancelBtn');
    fireEvent.click(cancelBtn);
  });
});

describe('Profile page', () => {
  it('should render without crashing', () => {
    localStorage.clear();
    render(
      <Router>
        <ProfilePage store={userStore} />
      </Router>,
    );
  });
});
