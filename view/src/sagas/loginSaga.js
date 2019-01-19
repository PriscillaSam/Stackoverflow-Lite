import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST } from '../actionTypes/authActionTypes';
import { logInApi } from '../api/auth';
import saveUserCredentials from '../utilities/storage';
import { stopLoading } from '../actions/loaderActions';
import {
  successNotification, errorNotication,
} from '../actions/notificationActions';

export function* loginSaga(action) {
  try {
    const { data } = yield call(logInApi, action.payload);
    const { status, message, ...userDetails } = data;
    saveUserCredentials(userDetails);
    yield put(successNotification(message));
  } catch (error) {
    const errorMessage = error.response !== undefined
      ? error.response.data.message : error.message;
    yield put(errorNotication(errorMessage));
  }
  yield put(stopLoading());
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
