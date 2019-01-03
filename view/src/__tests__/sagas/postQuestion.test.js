import { takeLatest, call, put } from 'redux-saga/effects';
import
watchPostQuestionSaga,
{ postQuestionSaga, postQuestion } from '../../sagas/postQuestionSaga';
import {
  POST_QUESTION_REQUEST,
} from '../../actionTypes/postQuestionActionTypes';

import {
  postQuestionFailure,
} from '../../actions/postQuestionActions';

const error = {
  response: {
    data: {
      status: 500,
      message: 'Network Error',
    },
  },
};

describe('Post question saga', () => {
  it('should execute saga to post question', () => {
    const action = {
      type: POST_QUESTION_REQUEST,
      payload: 'Test question',
    };

    const iterator = postQuestionSaga(action);
    const expectedOutput = call(postQuestion, action.payload);

    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(postQuestionFailure('Network Error')));
  });
});

describe('Post question watcher saga:', () => {
  it('should execute watch saga', () => {
    const iterator = watchPostQuestionSaga();

    expect(iterator.next().value)
      .toEqual(takeLatest(POST_QUESTION_REQUEST, postQuestionSaga));
  });
});
