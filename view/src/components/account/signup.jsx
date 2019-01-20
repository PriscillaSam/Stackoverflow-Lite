import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../button';
import Input from '../input';

import { signUpAction } from '../../actions/authActions';
import { loading } from '../../actions/loaderActions';
import { getItem } from '../../utilities/storage';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit = (event) => {
    event.preventDefault();
    const { registerUserAction, posting } = this.props;
    posting();
    registerUserAction(this.state);
  }

  render() {
    const { requesting } = this.props;

    const {
      name, email, password, confirmPassword,
    } = this.state;

    if (getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div id="form-back">
        <div className="center">
          <header className="mb-1">
            <h1 className="brand text-center mb-0 fadeInDown">
              <Link to="/">
                StackOverflow-
                <span className="brand-span">LITE</span>
              </Link>
            </h1>
          </header>
          <div id="signup" className="fadeIn">
            <div className="form-group">
              <h2 className="text-center text-primary mt-0 mb-0">REGISTER</h2>
              <hr className="form-rule" />

              <form
                id="signupForm"
                onSubmit={this.submit}
                data-testid="signup-form"
              >
                <Input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="your name"
                  id="fullName"
                  onChange={this.handleInputChange}
                />
                <Input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="your email"
                  id="loginEmail"
                  onChange={this.handleInputChange}
                />
                <Input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="your password"
                  id="loginPassword"
                  onChange={this.handleInputChange}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="confirm your password"
                  id="confirmPassword"
                  onChange={this.handleInputChange}
                />
                <div>
                  <Button
                    btnClassName="btn btn-success btn-block p-1"
                    disabled={false}
                    btnText="Register"
                    type="submit"
                    onLoading={requesting}
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <p className="text-center text-white text-lg">
              Already have an account?
              {' '}
              <Link
                to="/account/login"
                className="btn btn-sm btn-success p-1"
                id="login-toggle"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  requesting: PropTypes.bool.isRequired,
  posting: PropTypes.func.isRequired,
  registerUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  requesting: state.loader.requesting,
});

const actions = {
  registerUserAction: signUpAction,
  posting: loading,
};

export default connect(mapStateToProps, actions)(Signup);
