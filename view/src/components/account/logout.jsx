import React from 'react';
import { Redirect } from 'react-router-dom';
import { clearCredentials } from '../../utilities/storage';

export default function () {
  clearCredentials();
  return <Redirect to="/" />;
}
