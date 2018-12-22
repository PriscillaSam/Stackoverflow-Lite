import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../../../components/views/HomePage';
import store from '../../utilities/store';
import { questions } from '../../utilities/mockData';

afterEach(cleanup);

const questionsStore = store(questions);


describe('Home page', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <HomePage store={questionsStore} />
      </Router>,
    );
  });
});
