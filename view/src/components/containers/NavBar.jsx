import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logout from '../account/logout';
import UserNav from '../account/userNavItems';

const NavBar = ({ isLoggedIn }) => (
  <nav className="bg-dark shadow fadeInDown">
    <div className="d-i-block">
      <ul>
        <li className="hidden nav-toggle">
          <a className="btn text-success" href="m">
            <i className="fa fa-align-justify fa-lg" />
          </a>
        </li>
      </ul>
    </div>
    <div className="d-i-block md-100">
      <h1 className="display-3 mt-0">
        <Link to="/">
          StackOverflow-
          <span className="brand-span">
            LITE
          </span>
        </Link>
      </h1>
    </div>
    <div className="d-i-block collapse">
      <ul className="nav-collapse">
        {!isLoggedIn
          ? (
            <li className="d-inline mr-3 user">
              <Link className="btn btn-success" to="/account/signup">
                Sign up
              </Link>
            </li>
          )
          : <UserNav />
        }
      </ul>
    </div>
  </nav>
);

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
