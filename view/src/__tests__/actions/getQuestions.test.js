import * as types from '../../actionTypes/getQuestionsActionTypes';
import * as actions from '../../actions/getQuestionsActions';

describe('Get questions request', () => {
  it('should return type of get questions request', () => {
    expect(actions.getQuestions()).toEqual({
      type: types.GET_QUESTIONS_REQUEST,
    });
  });
});

describe('Get questions success', () => {
  it('should return success action type', () => {
    expect(actions.getQuestionsSuccess([])).toEqual({
      type: types.GET_QUESTIONS_SUCCESS,
      payload: [],
    });
  });
});

describe('Get questions failure', () => {
  it('should return failure action', () => {
    expect(actions.getQuestionsFailure('Bad Request')).toEqual({
      type: types.GET_QUESTIONS_FAILURE,
      payload: 'Bad Request',
    });
  });
});

describe('Search questions', () => {
  it('should return search action', () => {
    expect(actions.searchQuestions('A question')).toEqual({
      type: types.SEARCH_QUESTIONS,
      payload: 'A question',
    });
  });
});
