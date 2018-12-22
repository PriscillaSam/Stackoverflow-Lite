import * as types from '../../actionTypes/getQuestionsActionTypes';
import reducer from '../../reducers/questionsReducer';


describe('Questions reducer', () => {
  const initialState = {
    fetching: false,
    questions: null,
    error: null,
  };

  it('should return initial state if action type is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update fetching to true on request', () => {
    expect(reducer(undefined, {
      type: types.GET_QUESTIONS_REQUEST,
    })).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  it('should update with questions on success', () => {
    expect(reducer(undefined, {
      type: types.GET_QUESTIONS_SUCCESS,
      payload: [],
    })).toEqual({
      ...initialState,
      questions: [],
    });
  });

  it('should update error on failure', () => {
    expect(reducer(undefined, {
      type: types.GET_QUESTIONS_FAILURE,
      payload: 'Bad Request',
    })).toEqual({
      ...initialState,
      error: 'Bad Request',
    });
  });
});
