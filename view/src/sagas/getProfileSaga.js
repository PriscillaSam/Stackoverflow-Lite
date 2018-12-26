import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getItem } from '../utilities/storage';
import { GET_PROFILE } from '../actionTypes/profileActionTypes';
import {
  getProfileSuccess, getProfileFailure,
} from '../actions/profileActions';

export const getUserProfile = () => (
  axios.get(`${process.env.API_URL}/users/profile`, {
    headers: {
      Authorization: getItem('token'),
    },
  }));

export function* getProfileSaga() {
  try {
    const { data } = yield call(getUserProfile);
    yield put(getProfileSuccess(data));
  } catch (error) {
    yield put(getProfileFailure(error.response.data.message));
  }
}

export default function* watchProfileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
}
