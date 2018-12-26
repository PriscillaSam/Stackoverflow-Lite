import * as types from '../actionTypes/profileActionTypes';

const initialState = {
  fetching: false,
  profile: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE:
      return { ...state, fetching: true };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state, fetching: false, error: null, profile: action.payload,
      };
    case types.GET_PROFILE_FAILURE:
      return {
        ...state, fetching: false, error: action.payload,
      };
    default:
      return state;
  }
};
