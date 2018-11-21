import {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILURE,
  SIGNUP_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
} from '../actionTypes/authActionTypes';


export const signUpAction = body => ({
  type: SIGNUP_REQUEST,
  body,
});

export const signupSuccessAction = message => ({
  type: SIGNUP_REQUEST_SUCCESS,
  message,
});

export const signupFailureAction = error => ({
  type: SIGNUP_REQUEST_FAILURE,
  error,
});

export const loginAction = payload => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccessAction = response => ({
  type: LOGIN_REQUEST_SUCCESS,
  message: response.message,
  token: response.token,
});

export const loginFailureAction = error => ({
  type: LOGIN_REQUEST_FAILURE,
  error,
});
