import React from 'react';
import { Redirect } from 'react-router-dom';
import { getItem } from './storage';

export default (component) => {
  if (getItem('token')) {
    return <Redirect to="/" />;
  }
  return component;
};
