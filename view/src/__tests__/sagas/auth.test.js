import { takeLatest, call } from 'redux-saga/effects';
import watchSignup, { signupSaga } from '../../sagas/signupSaga';

import { SIGNUP_REQUEST, LOGIN_REQUEST } from '../../actionTypes/authActionTypes';
import { signUpApi, logInApi } from '../../api/auth';
import watchLogin, { loginSaga } from '../../sagas/loginSaga';


describe('Signup saga', () => {
  it('', () => {
    const body = {
      name: 'hello',
      email: 'email',
      password: 'password',
      confirmPassword: 'password',
    };

    const action = {
      type: SIGNUP_REQUEST,
      body,
    };

    const iterator = signupSaga(action);
    const expectedOutput = call(signUpApi, body);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
  });
});

describe('Watch signup saga', () => {
  it('', () => {
    const iterator = watchSignup();
    const expectedOutput = takeLatest(SIGNUP_REQUEST, signupSaga);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
  });
});

describe('Login saga', () => {
  it('', () => {
    const payload = {
      email: 'email',
      password: 'password',
    };

    const action = {
      type: LOGIN_REQUEST,
      payload,
    };

    const iterator = loginSaga(action);
    const expectedOutput = call(logInApi, payload);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
  });
});

describe('Watch login saga', () => {
  it('', () => {
    const iterator = watchLogin();
    const expectedOutput = takeLatest(LOGIN_REQUEST, loginSaga);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
  });
});
