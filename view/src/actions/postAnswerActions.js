import * as types from '../actionTypes/postAnswerActionTypes';

export const postAnswer = payload => ({
  type: types.POST_ANSWER_REQUEST,
  payload,
});

export const postAnswerSuccess = answer => ({
  type: types.POST_ANSWER_SUCCESS,
  payload: answer,
});

export const postAnswerFailure = error => ({
  type: types.POST_ANSWER_FAILURE,
  payload: error,
});
