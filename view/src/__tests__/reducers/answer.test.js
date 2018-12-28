import * as types from '../../actionTypes/postAnswerActionTypes';
import reducer from '../../reducers/answerReducer';


describe('Answer reducer', () => {
  const initialState = {
    posting: false,
    answers: [],
    error: null,
  };

  it('should return initial state if action type is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update fetching to  true on request', () => {
    expect(reducer(undefined, {
      type: types.POST_ANSWER_REQUEST,
    })).toEqual({
      ...initialState,
      posting: true,
    });
  });

  it('should update with answer on success', () => {
    localStorage.setItem('name', 'name');
    expect(reducer(undefined, {
      type: types.POST_ANSWER_SUCCESS,
      payload: {},
    })).toEqual({
      ...initialState,
      answers: [{
        name: 'name',
      }],
    });
  });

  it('should update error on failure', () => {
    expect(reducer(undefined, {
      type: types.POST_ANSWER_FAILURE,
      payload: 'Bad Request',
    })).toEqual({
      ...initialState,
      error: 'Bad Request',
    });
  });
});
