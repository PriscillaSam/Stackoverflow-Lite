import * as types from '../../actionTypes/profileActionTypes';
import reducer from '../../reducers/profileReducer';


describe('User profile reducer', () => {
  const initialState = {
    fetching: false,
    profile: null,
    error: null,
  };

  it('should return initial state if action type is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update fetching to true on request', () => {
    expect(reducer(undefined, {
      type: types.GET_PROFILE,
    })).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  it('should update with profile on success', () => {
    expect(reducer(undefined, {
      type: types.GET_PROFILE_SUCCESS,
      payload: {},
    })).toEqual({
      ...initialState,
      profile: {},
    });
  });

  it('should update error on failure', () => {
    expect(reducer(undefined, {
      type: types.GET_PROFILE_FAILURE,
      payload: 'Bad Request',
    })).toEqual({
      ...initialState,
      error: 'Bad Request',
    });
  });
});
