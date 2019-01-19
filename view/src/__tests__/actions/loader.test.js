import {
  LOADING,
  STOP_LOADING,
} from '../../actionTypes/loadingActionTypes';

import { loading, stopLoading } from '../../actions/loaderActions';

describe('Loading action', () => {
  it('should return loading action type', () => {
    expect(loading()).toEqual({
      type: LOADING,
    });
  });
});

describe('Stop loading action', () => {
  it('should return a stop loading action', () => {
    expect(stopLoading()).toEqual({
      type: STOP_LOADING,
    });
  });
});
