import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getItem } from '../utilities/storage';
import { POST_QUESTION_REQUEST } from '../actionTypes/postQuestionActionTypes';
import {
  postQuestionSuccess, postQuestionFailure,
} from '../actions/postQuestionActions';

export const postQuestion = question => (
  axios.post(`${process.env.API_URL}/questions`,
    {
      question,
    },
    {
      headers: {
        Authorization: getItem('token'),
      },
    }));

export function* postQuestionSaga(action) {
  try {
    const { data } = yield call(postQuestion, action.payload);
    yield put(postQuestionSuccess(data.new_question));
  } catch (error) {
    yield put(postQuestionFailure(error.response.data.message));
  }
}

export default function* watchPostQuestionSaga() {
  yield takeLatest(POST_QUESTION_REQUEST, postQuestionSaga);
}
