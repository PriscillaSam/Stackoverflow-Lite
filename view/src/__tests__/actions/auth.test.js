import * as actions from '../../actions/authActions';
import * as types from '../../actionTypes/authActionTypes';

describe('Signup request action', () => {
  it('should create an action to add a user', () => {
    const body = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    const expectedAction = {
      type: types.SIGNUP_REQUEST,
      body,
    };

    expect(actions.signUpAction(body)).toEqual(expectedAction);
  });
});

describe('signup success action', () => {
  it('should return a success action', () => {
    expect(actions.signupSuccessAction('Successful')).toEqual({
      type: types.SIGNUP_REQUEST_SUCCESS,
      message: 'Successful',
    });
  });
});

describe('signup failure action', () => {
  it('should return a failure action', () => {
    expect(actions.signupFailureAction('Bad Request')).toEqual({
      type: types.SIGNUP_REQUEST_FAILURE,
      error: 'Bad Request',
    });
  });
});

describe('Login request action', () => {
  it('should return a request action', () => {
    expect(actions.loginAction({})).toEqual({
      type: types.LOGIN_REQUEST,
      payload: {},
    });
  });
});

describe('Login success action', () => {
  it('should return a request action', () => {
    const payload = {
      message: 'message',
      token: 'token',
    };
    expect(actions.loginSuccessAction(payload)).toEqual({
      type: types.LOGIN_REQUEST_SUCCESS,
      ...payload,
    });
  });
});

describe('Login failure action', () => {
  it('should return a request action', () => {
    expect(actions.loginFailureAction('Bad Request')).toEqual({
      type: types.LOGIN_REQUEST_FAILURE,
      error: 'Bad Request',
    });
  });
});
