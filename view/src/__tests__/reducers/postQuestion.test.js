import * as types from '../../actionTypes/postQuestionActionTypes';
import reducer from '../../reducers/postQuestionReducer';


describe('Question reducer', () => {
  const initialState = {
    sending: false,
    sent: false,
    questions: [],
    error: null,
  };

  it('should return initial state if action type is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update sending to  true on request', () => {
    expect(reducer(undefined, {
      type: types.POST_QUESTION_REQUEST,
    })).toEqual({
      ...initialState,
      sending: true,
    });
  });

  it('should update with question on success', () => {
    expect(reducer(undefined, {
      type: types.POST_QUESTION_SUCCESS,
      payload: {},
    })).toEqual({
      ...initialState,
      questions: [{}],
      sent: true,
    });
  });

  it('should update error on failure', () => {
    expect(reducer(undefined, {
      type: types.POST_QUESTION_FAILURE,
      payload: 'Bad Request',
    })).toEqual({
      ...initialState,
      error: 'Bad Request',
    });
  });

  it('should reset to initial state', () => {
    expect(reducer(undefined, {
      type: types.CLEAN_UP,
    })).toEqual(initialState);
  });
});
