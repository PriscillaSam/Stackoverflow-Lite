import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import QuestionsPage from '../../components/views/Questions';
import store from '../utilities/store';
import { questions } from '../utilities/mockData';

afterEach(cleanup);

const questionsStore = store(questions);

describe('Questions page', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <QuestionsPage store={questionsStore} />
      </Router>,
    );
  });
});
