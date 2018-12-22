import * as types from '../actionTypes/getQuestionsActionTypes';

const initialState = {
  fetching: false,
  questions: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS_REQUEST:
      return { ...state, fetching: true };
    case types.GET_QUESTIONS_SUCCESS:
      return {
        ...state, fetching: false, error: null, questions: action.payload,
      };
    case types.GET_QUESTIONS_FAILURE:
      return {
        ...state, fetching: false, error: action.payload,
      };
    default:
      return state;
  }
};
