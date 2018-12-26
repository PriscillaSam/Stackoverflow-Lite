import * as types from '../actionTypes/getQuestionActionTypes';

const initialState = {
  fetching: false,
  question: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTION_REQUEST:
      return { ...state, fetching: true };
    case types.GET_QUESTION_SUCCESS:
      return {
        ...state, fetching: false, error: null, question: action.payload,
      };
    case types.GET_QUESTION_FAILURE:
      return {
        ...state, fetching: false, error: action.payload,
      };
    default:
      return state;
  }
};
