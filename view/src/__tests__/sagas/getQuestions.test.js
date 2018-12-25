import { takeLatest, call, put } from 'redux-saga/effects';
import
watchQuestions,
{ questionsSaga, getQuestions } from '../../sagas/getQuestionsSaga';
import {
  GET_QUESTIONS_REQUEST,
} from '../../actionTypes/getQuestionsActionTypes';

import {
  getQuestionsFailure,
} from '../../actions/getQuestionsActions';

const error = {
  status: 500,
  message: 'Network Error',
};

describe('Get questions saga', () => {
  it('should execute signup saga', () => {
    const iterator = questionsSaga();
    const expectedOutput = call(getQuestions);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(getQuestionsFailure('Network Error')));
  });
});

describe('Get questions watcher saga:', () => {
  it('should execute watch signup saga', () => {
    const iterator = watchQuestions();

    expect(iterator.next().value)
      .toEqual(takeLatest(GET_QUESTIONS_REQUEST, questionsSaga));
  });
});
