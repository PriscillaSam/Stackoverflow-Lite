import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserNav from '../account/userNavItems';

class NavBar extends Component {
  state = {}

  showBtn = React.createRef()

  hideBtn = React.createRef()

  nav = React.createRef()

  componentDidMount() {
    const { showBtn, hideBtn } = this;

    showBtn.current.addEventListener('click', this.showNavbar, false);
    hideBtn.current.addEventListener('click', this.hideNavbar, false);
  }

  componentWillUnmount() {
    const { showBtn, hideBtn } = this;

    showBtn.current.removeEventListener('click', this.showNavbar, false);
    hideBtn.current.removeEventListener('click', this.hideNavbar, false);
  }

  showNavbar = () => {
    const { nav } = this;
    if (nav.current.classList.contains('slideOutLeft')) {
      nav.current.classList.remove('slideOutLeft');
    }
    nav.current.classList.add('slideInLeft');

    setTimeout(() => {
      nav.current.style.display = 'block';
    });
  }

  hideNavbar = () => {
    const { nav } = this;
    if (nav.current.classList.contains('slideInLeft')) {
      nav.current.classList.remove('slideInLeft');
    }
    nav.current.classList.add('slideOutLeft');
    setTimeout(() => {
      nav.current.style.display = 'none';
    }, 1000);
  }

  render() {
    const { isLoggedIn, displayModal, displayQuestionLink } = this.props;

    return (
      <nav className="bg-dark shadow fadeInDown">
        <div className="d-i-block">
          <ul className="pl-1">
            <li className="hidden nav-toggle">
              <button
                type="button"
                className="text-success"
                ref={this.showBtn}
                data-testid="showBtn"
              >
                <i className="fa fa-align-justify fa-lg" />
              </button>
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
        <div
          className="d-i-block collapse"
          ref={this.nav}
          data-testid="nav"
        >
          <button
            type="button"
            className="btn close nav-toggle nav-toggle-btn"
            ref={this.hideBtn}
            data-testid="hideBtn"
          >
            <span className="">&times;</span>
          </button>
          <ul className="nav-collapse">
            {!isLoggedIn
              ? (
                <li className="d-inline mr-3">
                  <Link className="btn btn-success" to="/account/signup">
                    Sign up
                  </Link>
                </li>
              )
              : (
                <UserNav
                  displayModal={displayModal}
                  displayQuestionLink={displayQuestionLink}
                />
              )
            }
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  displayModal: PropTypes.func,
  displayQuestionLink: PropTypes.bool.isRequired,
};

export default NavBar;
