import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import UserNav from '../../components/account/userNavItems';
import NavBar from '../../components/containers/NavBar';

afterEach(cleanup);

localStorage.setItem('name', 'Sam Priscilla');

describe('Navbar', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(
      <Router>
        <NavBar isLoggedIn />
      </Router>,
    );

    const hideBtn = getByTestId('hideBtn');
    const showBtn = getByTestId('showBtn');
    const nav = getByTestId('nav');
    nav.classList.add('slideInLeft');
    fireEvent.click(hideBtn);
    fireEvent.click(showBtn);
  });

  it('should render without crashing', () => {
    const { getByTestId } = render(
      <Router>
        <NavBar isLoggedIn />
      </Router>,
    );

    const hideBtn = getByTestId('hideBtn');
    const showBtn = getByTestId('showBtn');
    const nav = getByTestId('nav');
    nav.classList.remove('slideOutLeft');

    fireEvent.click(hideBtn);
    fireEvent.click(showBtn);
  });
});

describe('User nav components', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <UserNav />
      </Router>,
    );
  });
});
