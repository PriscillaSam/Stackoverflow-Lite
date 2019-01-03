import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../../utilities/storage';
import '../../css/main.css';
import '../../css/style.css';

import Button from '../button';
import AlertBox from '../alertBox';
import Input from '../input';

import { loginAction } from '../../actions/authActions';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.props;
    if (token !== prevProps.token) {
      localStorage.setItem('token', token);
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit = (event) => {
    event.preventDefault();
    const { loginUserAction } = this.props;
    loginUserAction(this.state);
  }

  render() {
    if (getItem('token')) {
      return <Redirect to="/" />;
    }

    const {
      loggingIn, message, token, error,
    } = this.props;

    const { email, password } = this.state;
    const detail = message || error;
    const theme = detail === message ? 'success' : 'danger';

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

          {detail && <AlertBox detail={detail} theme={theme} />}

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
                    onLoading={loggingIn}
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
  loggingIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  loginUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggingIn: state.logIn.loggingIn,
  token: state.logIn.token,
  message: state.logIn.message,
  error: state.logIn.error,
});

const actions = {
  loginUserAction: loginAction,
};

export default connect(mapStateToProps, actions)(Login);
