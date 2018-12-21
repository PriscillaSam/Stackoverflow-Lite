import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST } from '../actionTypes/authActionTypes';
import { logInApi } from '../api/auth';
import { setToken } from '../utilities/storage';
import {
  loginFailureAction,
  loginSuccessAction,
} from '../actions/authActions';

export function* loginSaga(action) {
  try {
    const { data } = yield call(logInApi, action.payload);
    setToken(data.token);
    yield put(loginSuccessAction(data));
  } catch (error) {
    yield put(loginFailureAction(error.response.data.message));
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
