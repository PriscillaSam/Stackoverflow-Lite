import { takeLatest, call, put } from 'redux-saga/effects';
import
watchQuestionSaga,
{ getQuestionSaga, fetchQuestion } from '../../sagas/getQuestionSaga';
import {
  GET_QUESTION_REQUEST,
} from '../../actionTypes/getQuestionActionTypes';

import {
  getQuestionFailure,
} from '../../actions/getQuestionActions';

const error = {
  status: 500,
  message: 'Network Error',
};

describe('Get questions saga', () => {
  it('should execute saga to get a single question', () => {
    const action = {
      type: GET_QUESTION_REQUEST,
      payload: 1,
    };

    const iterator = getQuestionSaga(action);
    const expectedOutput = call(fetchQuestion, 1);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(getQuestionFailure('Network Error')));
  });
});

describe('Get question watcher saga:', () => {
  it('should execute watch saga', () => {
    const iterator = watchQuestionSaga();

    expect(iterator.next().value)
      .toEqual(takeLatest(GET_QUESTION_REQUEST, getQuestionSaga));
  });
});
