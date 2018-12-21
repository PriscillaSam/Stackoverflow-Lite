const mocks = {
  subscribe: () => jest.fn(),
  dispatch: () => jest.fn(),
};

const store = state => ({
  getState: () => state,
  setState: () => state,
  ...mocks,
});

export default store;
