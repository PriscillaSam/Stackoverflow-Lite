import * as types from '../actionTypes/postQuestionActionTypes';

export const postQuestion = question => ({
  type: types.POST_QUESTION_REQUEST,
  payload: question,
});

export const postQuestionSuccess = question => ({
  type: types.POST_QUESTION_SUCCESS,
  payload: question,
});

export const postQuestionFailure = error => ({
  type: types.POST_QUESTION_FAILURE,
  payload: error,
});

export const cleanUp = () => ({
  type: types.CLEAN_UP,
});
