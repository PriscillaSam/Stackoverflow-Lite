import signupReducer from '../../reducers/signupReducer';
import loginReducer from '../../reducers/loginReducer';
import * as types from '../../actionTypes/authActionTypes';

describe('Signup reducer', () => {
  it('should return initial state if action is undefined', () => {
    expect(signupReducer(undefined, {})).toEqual({
      creating: false,
      message: '',
      error: '',
    });
  });

  it('should handle signup action ', () => {
    expect(signupReducer([], {
      type: types.SIGNUP_REQUEST,
      body: {},
    })).toEqual({
      creating: true,
      error: '',
      message: '',
    });
  });

  it('should handle signup success action', () => {
    expect(signupReducer([], {
      type: types.SIGNUP_REQUEST_SUCCESS,
      message: 'signup successful',
    })).toEqual({
      creating: false,
      message: 'signup successful',
      error: '',
    });
  });

  it('should handle signup failure action', () => {
    expect(signupReducer([], {
      type: types.SIGNUP_REQUEST_FAILURE,
      error: 'failed to signup',
    })).toEqual({
      creating: false,
      error: 'failed to signup',
      message: '',
    });
  });
});

describe('Login reducer', () => {
  const initialState = {
    loggingIn: false,
    token: '',
    message: '',
    error: '',
  };

  it('should return initial state if action is undefined', () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it('should change logginIn state to true', () => {
    expect(loginReducer(undefined, {
      type: types.LOGIN_REQUEST,
      payload: {},
    })).toEqual({
      ...initialState,
      loggingIn: true,
    });
  });

  it('should update state on login success', () => {
    expect(loginReducer(undefined, {
      type: types.LOGIN_REQUEST_SUCCESS,
      message: 'message',
      token: 'token',
    })).toEqual({
      ...initialState,
      message: 'message',
      token: 'token',
    });
  });

  it('should update error on login failure', () => {
    expect(loginReducer(undefined, {
      type: types.LOGIN_REQUEST_FAILURE,
      error: 'error',
    })).toEqual({
      ...initialState,
      error: 'error',
    });
  });
});
