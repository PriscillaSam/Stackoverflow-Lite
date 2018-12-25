import { takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_REQUEST } from '../actionTypes/authActionTypes';
import { signUpApi } from '../api/auth';
import saveUserCredentials from '../utilities/storage';
import {
  signupSuccessAction,
  signupFailureAction,
} from '../actions/authActions';


export function* signupSaga(action) {
  try {
    const {
      data: { status, message, ...userDetails },
    } = yield call(signUpApi, action.body);

    saveUserCredentials(userDetails);
    yield put(signupSuccessAction(message));
  } catch (error) {
    yield put(signupFailureAction(error.response.data.message));
  }
}

export default function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}
