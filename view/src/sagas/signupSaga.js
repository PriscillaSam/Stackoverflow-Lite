import { takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_REQUEST } from '../actionTypes/authActionTypes';
import { signUpApi } from '../api/auth';
import saveUserCredentials from '../utilities/storage';

import { stopLoading } from '../actions/loaderActions';
import {
  successNotification, errorNotication,
} from '../actions/notificationActions';

export function* signupSaga(action) {
  try {
    const {
      data: { status, message, ...userDetails },
    } = yield call(signUpApi, action.body);

    saveUserCredentials(userDetails);
    yield put(successNotification(message));
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined) {
      errorMessage = error.response.data.message !== undefined
        ? error.response.data.message
        : error.response.data.errorData.errorMessages;
    } else {
      errorMessage = 'Please check your internet connection';
    }
    yield put(errorNotication(errorMessage));
  }
  yield put(stopLoading());
}

export default function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}
