import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../../components/views/ProfilePage';
import store from '../utilities/store';
import { userProfile, userProfile2 } from '../utilities/mockData';

afterEach(cleanup);

const userStore = store(userProfile);
const userStore2 = store(userProfile2);


describe('Profile page', () => {
  it('should render without crashing when there are answers', () => {
    render(
      <Router>
        <ProfilePage store={userStore} />
      </Router>,
    );
  });
});

describe('Question page', () => {
  localStorage.setItem('token', 'token');
  localStorage.setItem('name', 'Priscilla Sam-Iduh');

  it('should render without crashing when there are no answers', () => {
    render(
      <Router>
        <ProfilePage store={userStore2} />
      </Router>,
    );
  });
});
