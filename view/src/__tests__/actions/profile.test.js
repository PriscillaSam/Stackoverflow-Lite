import * as types from '../../actionTypes/profileActionTypes';
import * as actions from '../../actions/profileActions';

describe('Get user profile request action', () => {
  it('should return get profile request action', () => {
    expect(actions.getProfile()).toEqual({
      type: types.GET_PROFILE,
    });
  });
});

describe('Get user profile success', () => {
  it('should return success action type', () => {
    expect(actions.getProfileSuccess({})).toEqual({
      type: types.GET_PROFILE_SUCCESS,
      payload: {},
    });
  });
});

describe('Get user profile failure', () => {
  it('should return failure action', () => {
    expect(actions.getProfileFailure('Bad Request')).toEqual({
      type: types.GET_PROFILE_FAILURE,
      payload: 'Bad Request',
    });
  });
});
