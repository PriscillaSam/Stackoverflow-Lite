import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
} from '../actionTypes/authActionTypes';


export const signUpAction = body => ({
  type: SIGNUP_REQUEST,
  body,
});

export const loginAction = payload => ({
  type: LOGIN_REQUEST,
  payload,
});
