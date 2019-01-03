import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import QuestionModal from '../../components/containers/QuestionModal';
import store from '../utilities/store';
import { postQuestion, postQuestion2 } from '../utilities/mockData';

const postQuestionStore = store(postQuestion);
const postQuestionStore2 = store(postQuestion2);

afterEach(cleanup);

describe('Question Modal', () => {
  const hideModal = jest.fn();

  it('should render without crashing', () => {
    render(
      <Router>
        <QuestionModal store={postQuestionStore2} hideModal={hideModal} />
      </Router>,
    );
  });

  it('should submit form to post question', () => {
    const { getByTestId } = render(
      <Router>
        <QuestionModal store={postQuestionStore} hideModal={hideModal} />
      </Router>,
    );

    const form = getByTestId('question-form');
    const input = getByTestId('question-input');

    fireEvent.change(input, { target: { value: 'A new Question' } });
    fireEvent.submit(form);
  });

  it('should hide modal on button click', () => {
    const { getByTestId } = render(
      <Router>
        <QuestionModal store={postQuestionStore} hideModal={hideModal} />
      </Router>,
    );

    const hideBtn = getByTestId('hide-btn');

    fireEvent.click(hideBtn);
  });
});
