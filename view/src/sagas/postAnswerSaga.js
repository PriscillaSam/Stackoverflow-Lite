import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getItem } from '../utilities/storage';
import { POST_ANSWER_REQUEST } from '../actionTypes/postAnswerActionTypes';
import {
  postAnswerSuccess, postAnswerFailure,
} from '../actions/postAnswerActions';

export const postAnswer = ({ id, answer }) => (
  axios.post(`${process.env.API_URL}/questions/${id}/answers`,
    {
      answer,
    },
    {
      headers: {
        Authorization: getItem('token'),
      },
    }));

export function* postAnswerSaga(action) {
  try {
    const { data } = yield call(postAnswer, action.payload);
    yield put(postAnswerSuccess(data.new_answer));
  } catch (error) {
    yield put(postAnswerFailure(error.response.data.message));
  }
}

export default function* watchPostAnswerSaga() {
  yield takeLatest(POST_ANSWER_REQUEST, postAnswerSaga);
}
