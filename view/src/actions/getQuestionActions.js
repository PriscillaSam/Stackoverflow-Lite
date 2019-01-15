import * as types from '../actionTypes/getQuestionActionTypes';

export const getQuestion = id => ({
  type: types.GET_QUESTION_REQUEST,
  payload: id,
});

export const getQuestionSuccess = question => ({
  type: types.GET_QUESTION_SUCCESS,
  payload: question,
});

export const getQuestionFailure = error => ({
  type: types.GET_QUESTION_FAILURE,
  payload: error,
});

export const acceptAnswer = id => ({
  type: types.ACCEPT_ANSWER,
  payload: id,
});
