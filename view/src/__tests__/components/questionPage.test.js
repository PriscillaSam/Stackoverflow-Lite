import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import QuestionPage from '../../components/views/Question';
import store from '../utilities/store';
import { question, question2 } from '../utilities/mockData';

afterEach(cleanup);

const questionStore = store(question);
const questionStore2 = store(question2);

const match = {
  params: {
    id: 1,
  },
};

describe('Question page', () => {
  it('should render without crashing when there are answers', () => {
    render(
      <Router>
        <QuestionPage store={questionStore} match={match} />
      </Router>,
    );
  });
});

describe('Question page', () => {
  it('should render without crashing when there are no answers', () => {
    const { getByTestId } = render(
      <Router>
        <QuestionPage store={questionStore2} match={match} />
      </Router>,
    );

    const input = getByTestId('answer-input');
    const form = getByTestId('answer-form');

    fireEvent.change(input, { target: { value: 'An answer' } });
    fireEvent.submit(form);
  });
});
