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
    case types.ACCEPT_ANSWER: {
      const { question } = state;
      const answers = question.answers.map((answer) => {
        const updatedAnswer = answer;
        if (updatedAnswer.id === Number.parseInt(action.payload, 10)) {
          updatedAnswer.is_accepted = true;
          return updatedAnswer;
        }
        updatedAnswer.is_accepted = false;
        return updatedAnswer;
      });
      return {
        ...state,
        question: { ...question, answers },
        fetching: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
