import * as types from '../../actionTypes/getQuestionActionTypes';
import reducer from '../../reducers/singleQuestionReducer';


describe('Single question reducer', () => {
  const initialState = {
    fetching: false,
    question: null,
    error: null,
  };

  it('should return initial state if action type is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update fetching to true on request', () => {
    expect(reducer(undefined, {
      type: types.GET_QUESTION_REQUEST,
    })).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  it('should update with question on success', () => {
    expect(reducer(undefined, {
      type: types.GET_QUESTION_SUCCESS,
      payload: {},
    })).toEqual({
      ...initialState,
      question: {},
    });
  });

  it('should update error on failure', () => {
    expect(reducer(undefined, {
      type: types.GET_QUESTION_FAILURE,
      payload: 'Bad Request',
    })).toEqual({
      ...initialState,
      error: 'Bad Request',
    });
  });
});
