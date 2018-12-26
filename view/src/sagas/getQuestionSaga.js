import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_QUESTION_REQUEST } from '../actionTypes/getQuestionActionTypes';
import {
  getQuestionSuccess, getQuestionFailure,
} from '../actions/getQuestionActions';

export const fetchQuestion = id => (
  axios.get(`${process.env.API_URL}/questions/${id}`)
);

export function* getQuestionSaga(action) {
  try {
    const { data } = yield call(fetchQuestion, action.payload);
    yield put(getQuestionSuccess(data.question_details));
  } catch (error) {
    yield put(getQuestionFailure(error.message));
  }
}

export default function* watchGetQuestionSaga() {
  yield takeLatest(GET_QUESTION_REQUEST, getQuestionSaga);
}
