import * as types from '../../actionTypes/getQuestionActionTypes';
import * as actions from '../../actions/getQuestionActions';

describe('Get a single question request', () => {
  it('should return type of get question request', () => {
    expect(actions.getQuestion(1)).toEqual({
      type: types.GET_QUESTION_REQUEST,
      payload: 1,
    });
  });
});

describe('Get question success', () => {
  it('should return success action type', () => {
    expect(actions.getQuestionSuccess({})).toEqual({
      type: types.GET_QUESTION_SUCCESS,
      payload: {},
    });
  });
});

describe('Get question failure', () => {
  it('should return failure action', () => {
    expect(actions.getQuestionFailure('Bad Request')).toEqual({
      type: types.GET_QUESTION_FAILURE,
      payload: 'Bad Request',
    });
  });
});
