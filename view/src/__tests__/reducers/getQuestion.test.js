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

  it('should update fetching to  true on request', () => {
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

  it('should update error on failure', () => {
    const question = {
      id: 1,
      question: 'Why is programming hard?',
      created_at: '2018-12-22T20:22:19.940Z',
      user_id: 6,
      name: 'Garry Doe',
      answers: [
        {
          id: 1,
          answer: 'Its not hard, just difficult',
          user_id: 2,
          name: 'John Doe',
          email: 'john.doe@gmailcom',
          upvotes: '0',
          downvotes: '0',
          comments: '0',
          created_at: '2018-12-22T20:22:19.940Z',
          is_accepted: false,
        },
        {
          id: 2,
          answer: 'I love programming',
          user_id: 3,
          name: 'Sam Doe',
          email: 'sami@gmail.com',
          upvotes: '0',
          downvotes: '0',
          comments: '0',
          created_at: '2018-12-22T20:22:19.940Z',
          is_accepted: false,
        },
      ],
    };

    const questionUpdated = {
      id: 1,
      question: 'Why is programming hard?',
      created_at: '2018-12-22T20:22:19.940Z',
      user_id: 6,
      name: 'Garry Doe',
      answers: [
        {
          id: 1,
          answer: 'Its not hard, just difficult',
          user_id: 2,
          name: 'John Doe',
          email: 'john.doe@gmailcom',
          upvotes: '0',
          downvotes: '0',
          comments: '0',
          created_at: '2018-12-22T20:22:19.940Z',
          is_accepted: true,
        },
        {
          id: 2,
          answer: 'I love programming',
          user_id: 3,
          name: 'Sam Doe',
          email: 'sami@gmail.com',
          upvotes: '0',
          downvotes: '0',
          comments: '0',
          created_at: '2018-12-22T20:22:19.940Z',
          is_accepted: false,
        },
      ],
    };

    expect(reducer({ ...initialState, question }, {
      type: types.ACCEPT_ANSWER,
      payload: '1',
    })).toEqual({
      ...initialState,
      question: questionUpdated,
    });
  });
});
