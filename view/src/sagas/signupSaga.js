import { takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_REQUEST } from '../actionTypes/authActionTypes';
import { signUpApi } from '../api/auth';
import { setToken } from '../utilities/storage';
import {
  signupSuccessAction,
  signupFailureAction,
} from '../actions/authActions';


export function* signupSaga(action) {
  try {
    const { data } = yield call(signUpApi, action.body);
    setToken(data.token);
    yield put(signupSuccessAction(data.message));
  } catch (error) {
    yield put(signupFailureAction(error.response.data.message));
  }
}

export default function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}
