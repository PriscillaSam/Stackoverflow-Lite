import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import mockAxios from '../../../__mocks__/mockAxios';
import rootSaga from '../../sagas';
import * as types from '../../actionTypes/getQuestionsActionTypes';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('Get comments watcher saga:', () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {
      status: 200,
      message: 'success',
      questions: [],
    },
  }));

  it('should execute get comments saga', () => {
    const store = mockStore({});
    sagaMiddleware.run(rootSaga);
    const expectedActions = [
      { type: types.GET_QUESTIONS_REQUEST },
      { type: types.GET_QUESTIONS_SUCCESS, payload: [] },
    ];

    store.dispatch({ type: types.GET_QUESTIONS_REQUEST });

    store.subscribe(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });


  it('should dispatch a failure action', (done) => {
    const store = mockStore({});
    sagaMiddleware.run(rootSaga);

    const response = {
      status: 500,
      message: 'Network Error',
    };
    mockAxios.get.mockImplementationOnce(() => Promise.reject({ response }));

    const expectedActions = [
      { type: types.GET_QUESTIONS_REQUEST },
      { type: types.GET_QUESTIONS_FAILURE, payload: 'Network Error' },
    ];

    store.dispatch({ type: types.GET_QUESTIONS_REQUEST });

    store.subscribe(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });
});
