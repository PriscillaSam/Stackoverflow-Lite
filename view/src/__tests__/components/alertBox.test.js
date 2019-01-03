import React from 'react';
import { render } from 'react-testing-library';
import AlertBox from '../../components/alertBox';


describe('Alert Box component', () => {
  it('should', () => {
    const props = {
      theme: 'danger',
      detail: 'Login successful',
    };

    const { getByText } = render(<AlertBox {...props} />);

    const alertMessage = getByText(props.detail);

    expect(alertMessage).toBeDefined();
    expect(alertMessage.parentElement.className).toBe('bg-danger alert fadeIn');
  });
});
