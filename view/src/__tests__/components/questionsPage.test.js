import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import QuestionsPage from '../../components/views/Questions';
import store from '../utilities/store';
import { questions, questions2 } from '../utilities/mockData';

afterEach(cleanup);

const questionsStore = store(questions);
const questionsStore2 = store(questions2);

describe('Questions page', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <QuestionsPage store={questionsStore} />
      </Router>,
    );
  });
});

describe('Question page', () => {
  it('should return search results', () => {
    const { getByTestId } = render(
      <Router>
        <QuestionsPage store={questionsStore} />
      </Router>,
    );

    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'question' } });
  });

  it('should render the no result div', () => {
    const { getByTestId } = render(
      <Router>
        <QuestionsPage store={questionsStore2} />
      </Router>,
    );

    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'None' } });
  });
});
