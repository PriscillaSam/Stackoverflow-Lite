import { takeLatest, call, put } from 'redux-saga/effects';
import
watchProfileSaga,
{ getProfileSaga, getUserProfile } from '../../sagas/getProfileSaga';
import {
  GET_PROFILE,
} from '../../actionTypes/profileActionTypes';

import {
  getProfileFailure,
} from '../../actions/profileActions';

const error = {
  response: {
    data: {
      status: 500,
      message: 'Network Error',
    },
  },
};

describe('Get questions saga', () => {
  it('should execute saga to get a single question', () => {
    const action = {
      type: GET_PROFILE,
    };

    const iterator = getProfileSaga(action);
    const expectedOutput = call(getUserProfile);
    const actual = iterator.next().value;

    expect(actual).toEqual(expectedOutput);
    expect(iterator.throw(error).value)
      .toEqual(put(getProfileFailure('Network Error')));
  });
});

describe('Get question watcher saga:', () => {
  it('should execute watch saga', () => {
    const iterator = watchProfileSaga();

    expect(iterator.next().value)
      .toEqual(takeLatest(GET_PROFILE, getProfileSaga));
  });
});
