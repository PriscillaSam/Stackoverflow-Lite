import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserHistory } from 'react-router-dom';
import Router from './router';

const Index = () => <div>Hello React!</div>;

ReactDOM.render(
  <BrowserRouter history={BrowserHistory}>
    {Router}
  </BrowserRouter>, document.getElementById('index'),
);
