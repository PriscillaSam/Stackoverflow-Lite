import React from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from './storage';

export default (component) => {
  if (getToken()) {
    return <Redirect to="/" />;
  }
  return component;
};
