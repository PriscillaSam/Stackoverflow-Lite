import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  getQuestionsSuccess, getQuestionsFailure,
} from '../actions/getQuestionsActions';
import { GET_QUESTIONS_REQUEST } from '../actionTypes/getQuestionsActionTypes';

const getQuestions = () => axios.get(`${process.env.API_URL}/questions`);

function* questionsSaga() {
  try {
    const { data } = yield call(getQuestions);
    yield put(getQuestionsSuccess(data.questions));
  } catch (error) {
    yield put(getQuestionsFailure(error.message));
  }
}

export default function* watchQuestionsSaga() {
  yield takeLatest(GET_QUESTIONS_REQUEST, questionsSaga);
}
