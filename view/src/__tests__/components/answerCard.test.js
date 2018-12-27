import React from 'react';
import { render } from 'react-testing-library';
import AnswerCard from '../../components/containers/AnswerCard';


describe('Answer Card component', () => {
  it('should render without crashing', () => {
    const answer = {
      id: 2,
      answer: 'I love programming',
      user_id: 3,
      name: 'Sam Doe',
      email: 'sami@gmail.com',
      upvotes: '0',
      downvotes: '0',
      comments: '0',
      created_at: '2018-12-22T20:22:19.940Z',
      is_accepted: true,
    };

    render(
      <AnswerCard answer={answer} userId="1" />,
    );
  });
});

describe('Answer Card component', () => {
  it('should render without crashing', () => {
    localStorage.setItem('user_id', '3');

    const answer = {
      id: 2,
      answer: 'I love programming',
      user_id: 3,
      name: 'Sam Doe',
      email: 'sami@gmail.com',
      upvotes: '0',
      downvotes: '0',
      comments: '0',
      created_at: '2018-12-22T20:22:19.940Z',
      is_accepted: false,
    };

    render(
      <AnswerCard answer={answer} userId="3" />,
    );
  });
});
