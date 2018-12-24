import saveUserCredentials, { clearCredentials } from '../../utilities/storage';

describe('Save credentials function', () => {
  it('should save inputs to local storage', () => {
    const obj = {
      name: 'name',
      token: 'token',
      user_id: 1,
    };

    saveUserCredentials(obj);
    expect(localStorage.getItem('name')).toEqual('name');
    expect(localStorage.getItem('token')).toEqual('token');
    expect(localStorage.getItem('user_id')).toEqual('1');
  });
});

describe('Clear credentials function', () => {
  it('should clear local storage items', () => {
    clearCredentials();
    expect(localStorage.getItem('name')).toEqual(null);
    expect(localStorage.getItem('token')).toEqual(null);
    expect(localStorage.getItem('user_id')).toEqual(null);
  });
});
