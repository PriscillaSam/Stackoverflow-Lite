import * as types from '../actionTypes/postAnswerActionTypes';
import { getItem } from '../utilities/storage';

const initialState = {
  posting: false,
  answers: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POST_ANSWER_REQUEST:
      return { ...state, posting: true };
    case types.POST_ANSWER_SUCCESS: {
      const answer = {
        ...action.payload,
        name: getItem('name'),
      };

      return {
        ...state,
        posting: false,
        error: null,
        answers: [...state.answers, answer],
      };
    }
    case types.POST_ANSWER_FAILURE:
      return {
        ...state, posting: false, error: action.payload,
      };
    default:
      return state;
  }
};
