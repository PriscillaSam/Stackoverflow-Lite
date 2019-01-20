import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../../actionTypes/authActionTypes';
import { signUpApi, logInApi } from '../../api/auth';
import watchLogin, { loginSaga } from '../../sagas/loginSaga';
import watchSignup, { signupSaga } from '../../sagas/signupSaga';
import mockAxios from '../../../__mocks__/mockAxios';
import { errorNotication } from '../../actions/notificationActions';

const error = {
  response: {
    data: {
      status: 500,
      message: 'Network Error',
    },
  },
};


describe('Signup saga', () => {
  it('should execute signup saga', () => {
    const body = {};

    const action = {
      type: types.SIGNUP_REQUEST,
      body,
    };

    const iterator = signupSaga(action);
    const expectedOutput = call(signUpApi, body);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(errorNotication('Network Error')));
  });
});

describe('Watch signup saga', () => {
  it('should execute watch signup saga', () => {
    const iterator = watchSignup();

    expect(iterator.next().value)
      .toEqual(takeLatest(types.SIGNUP_REQUEST, signupSaga));
  });
});


describe('Login saga', () => {
  it('should execute login saga', () => {
    const payload = {};

    const action = {
      type: types.LOGIN_REQUEST,
      payload,
    };

    const iterator = loginSaga(action);
    const expectedOutput = call(logInApi, payload);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(errorNotication('Network Error')));
  });
});

describe('Watch login saga', () => {
  it('should execute watch login saga', () => {
    const iterator = watchLogin();
    const expectedOutput = takeLatest(types.LOGIN_REQUEST, loginSaga);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
  });
});
