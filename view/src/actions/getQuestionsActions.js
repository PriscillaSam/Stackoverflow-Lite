import * as types from '../actionTypes/getQuestionsActionTypes';

export const getQuestions = () => ({
  type: types.GET_QUESTIONS_REQUEST,
});

export const getQuestionsSuccess = questions => ({
  type: types.GET_QUESTIONS_SUCCESS,
  payload: questions,
});

export const getQuestionsFailure = error => ({
  type: types.GET_QUESTIONS_FAILURE,
  payload: error,
});
