import { takeLatest, call, put } from 'redux-saga/effects';
import
watchAnswerSaga,
{ postAnswerSaga, postAnswer } from '../../sagas/postAnswerSaga';
import {
  POST_ANSWER_REQUEST,
} from '../../actionTypes/postAnswerActionTypes';

import {
  postAnswerFailure,
} from '../../actions/postAnswerActions';

const error = {
  response: {
    data: {
      status: 500,
      message: 'Network Error',
    },
  },
};

describe('Post answer saga', () => {
  it('should execute saga to post answer', () => {
    const action = {
      type: POST_ANSWER_REQUEST,
      payload: 1,
    };

    const iterator = postAnswerSaga(action);
    const expectedOutput = call(postAnswer, 1);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(postAnswerFailure('Network Error')));
  });
});

describe('Post answer watcher saga:', () => {
  it('should execute watch saga', () => {
    const iterator = watchAnswerSaga();

    expect(iterator.next().value)
      .toEqual(takeLatest(POST_ANSWER_REQUEST, postAnswerSaga));
  });
});
