import * as types from '../../actionTypes/postAnswerActionTypes';
import * as actions from '../../actions/postAnswerActions';

describe('Post answer request', () => {
  it('should return type of post answer request', () => {
    expect(actions.postAnswer(1)).toEqual({
      type: types.POST_ANSWER_REQUEST,
      payload: 1,
    });
  });
});

describe('Post answer success', () => {
  it('should return success action type', () => {
    expect(actions.postAnswerSuccess({})).toEqual({
      type: types.POST_ANSWER_SUCCESS,
      payload: {},
    });
  });
});

describe('Post answer failure', () => {
  it('should return failure action', () => {
    expect(actions.postAnswerFailure('Bad Request')).toEqual({
      type: types.POST_ANSWER_FAILURE,
      payload: 'Bad Request',
    });
  });
});
