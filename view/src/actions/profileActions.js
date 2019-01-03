import * as types from '../actionTypes/profileActionTypes';

export const getProfile = () => ({
  type: types.GET_PROFILE,
});

export const getProfileSuccess = profile => ({
  type: types.GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileFailure = error => ({
  type: types.GET_PROFILE_FAILURE,
  payload: error,
});

export const removeQuestion = id => ({
  type: types.DELETE_QUESTION,
  payload: id,
});
