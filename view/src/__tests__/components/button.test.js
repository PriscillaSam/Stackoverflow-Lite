import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Button from '../../components/button';

afterEach(cleanup);

const props = {
  btnClassName: '',
  btnText: 'Some text',
  disabled: false,
  onLoading: true,
};

describe('Button component', () => {
  it('should render without crashing', () => {
    render(
      <Button {...props} />,
    );
  });
});
