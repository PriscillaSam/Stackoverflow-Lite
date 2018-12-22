import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Button from '../../../../components/button';

afterEach(cleanup);

const props = {
  btnClassName: '',
  btnId: '',
  btnText: '',
  onLoading: false,
};

describe('Button component', () => {
  it('should render without crashing', () => {
    render(
      <Button {...props} />,
    );
  });
});
