import * as types from '../actionTypes/postQuestionActionTypes';

const initialState = {
  sending: false,
  questions: [],
  sent: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POST_QUESTION_REQUEST:
      return {
        ...state, sending: true, error: null, sent: false,
      };

    case types.POST_QUESTION_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true,
        error: null,
        questions: [action.payload, ...state.questions],
      };

    case types.POST_QUESTION_FAILURE:
      return {
        ...state, sending: false, error: action.payload, sent: false,
      };

    case types.CLEAN_UP:
      return { ...state, sent: false };

    default:
      return state;
  }
};
