import * as types from '../../actionTypes/postQuestionActionTypes';
import * as actions from '../../actions/postQuestionActions';

describe('Post question request', () => {
  it('should return type of post question request', () => {
    expect(actions.postQuestion('New question')).toEqual({
      type: types.POST_QUESTION_REQUEST,
      payload: 'New question',
    });
  });
});

describe('Post question success', () => {
  it('should return success action type', () => {
    expect(actions.postQuestionSuccess({})).toEqual({
      type: types.POST_QUESTION_SUCCESS,
      payload: {},
    });
  });
});

describe('Post question failure', () => {
  it('should return failure action', () => {
    expect(actions.postQuestionFailure('Bad Request')).toEqual({
      type: types.POST_QUESTION_FAILURE,
      payload: 'Bad Request',
    });
  });
});

describe('Post question clean up', () => {
  it('should return clean up action', () => {
    expect(actions.cleanUp()).toEqual({
      type: types.CLEAN_UP,
    });
  });
});
