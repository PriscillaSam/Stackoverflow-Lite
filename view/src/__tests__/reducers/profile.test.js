import * as types from '../../actionTypes/profileActionTypes';
import reducer from '../../reducers/profileReducer';


describe('User profile reducer', () => {
  const initialState = {
    fetching: false,
    profile: null,
    error: null,
  };

  it('should return initial state if action type is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update fetching to true on request', () => {
    expect(reducer(undefined, {
      type: types.GET_PROFILE,
    })).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  it('should update with profile on success', () => {
    expect(reducer(undefined, {
      type: types.GET_PROFILE_SUCCESS,
      payload: {},
    })).toEqual({
      ...initialState,
      profile: {},
    });
  });

  it('should update error on failure', () => {
    expect(reducer(undefined, {
      type: types.GET_PROFILE_FAILURE,
      payload: 'Bad Request',
    })).toEqual({
      ...initialState,
      error: 'Bad Request',
    });
  });

  it('should remove question on delete', () => {
    const profile = {
      user_id: 4,
      answers: '1',
      asked: 2,
      most_answered: [
        {
          id: 3,
          question: 'Why do we have seasons and weather?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '6',
        },
        {
          id: 2,
          question: 'Cooking is a skill or inborn?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '3',
        },
      ],
      recent: [
        {
          id: 3,
          question: 'Why do we have seasons and weather?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '6',
        },
        {
          id: 2,
          question: 'Cooking is a skill or inborn?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '3',
        },
      ],
    };

    const updated = {
      user_id: 4,
      answers: '1',
      asked: 2,
      most_answered: [
        {
          id: 3,
          question: 'Why do we have seasons and weather?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '6',
        },
      ],
      recent: [
        {
          id: 3,
          question: 'Why do we have seasons and weather?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '6',
        },
      ],
    };

    const state = {
      ...initialState,
      profile,
    };

    expect(reducer(state, {
      type: types.DELETE_QUESTION,
      payload: '1',
    })).toEqual({
      ...initialState,
      profile,
    });

    expect(reducer(state, {
      type: types.DELETE_QUESTION,
      payload: '2',
    })).toEqual({
      ...initialState,
      profile: updated,
    });
  });
});
