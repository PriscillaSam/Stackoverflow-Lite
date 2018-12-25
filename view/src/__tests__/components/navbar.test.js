import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import UserNav from '../../components/account/userNavItems';
import NavBar from '../../components/containers/NavBar';
import store from '../utilities/store';
import { questions } from '../utilities/mockData';

afterEach(cleanup);

const questionsStore = store(questions);

localStorage.setItem('name', 'Sam Priscilla');

describe('Navbar', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <NavBar isLoggedIn />
      </Router>,
    );
  });
});

describe('Home page', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <UserNav />
      </Router>,
    );
  });
});
