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

    case types.DELETE_QUESTION: {
      let { profile } = state;

      const recent = profile.recent
        .filter(question => question.id.toString() !== action.payload);
      const mostAnswered = profile.most_answered
        .filter(question => question.id.toString() !== action.payload);

      profile = { ...state.profile, recent, most_answered: mostAnswered };
      return {
        ...state, profile,
      };
    }
    default:
      return state;
  }
};
