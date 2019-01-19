import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../../utilities/storage';

import Button from '../button';
import Input from '../input';

import { loginAction } from '../../actions/authActions';
import { loading } from '../../actions/loaderActions';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit = (event) => {
    event.preventDefault();
    const { loginUserAction, posting } = this.props;
    posting();
    loginUserAction(this.state);
  }

  render() {
    if (getItem('token')) {
      return <Redirect to="/" />;
    }

    const {
      requesting,
    } = this.props;

    const { email, password } = this.state;

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

          <div id="login" className="fadeIn">
            <div className="form-group">
              <h2 className="text-center text-primary mt-0 mb-0">SIGN IN</h2>
              <hr className="form-rule" />

              <form
                id="loginForm"
                onSubmit={this.submit}
                data-testid="login-form"
              >
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
                <div>
                  <Button
                    btnClassName="btn btn-success btn-block p-1"
                    disabled={false}
                    btnText="Welcome"
                    type="submit"
                    onLoading={requesting}
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <p className="text-center text-white text-lg">
              Dont have an account?
              {' '}
              <Link to="/account/signup" className="btn btn-sm btn-success p-1">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  requesting: PropTypes.bool.isRequired,
  loginUserAction: PropTypes.func.isRequired,
  posting: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  requesting: state.loader.requesting,
});

const actions = {
  loginUserAction: loginAction,
  posting: loading,
};

export default connect(mapStateToProps, actions)(Login);
