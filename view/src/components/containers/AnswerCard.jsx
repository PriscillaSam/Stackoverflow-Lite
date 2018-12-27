import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import timeFormatter from '../../utilities/timeFormatter';
import { getItem } from '../../utilities/storage';

const AnswerCard = ({ answer, userId }) => (
  <div className="box">
    <p className="lead mb-0">{answer.answer}</p>
    <h3 className="display-3 mb-0">
      <i className="far fa-user text-success" />
      {' '}
      <span className="mr-1">{answer.name}</span>
      <span className="text-primary">
        <i className="far fa-envelope fa-fw text-success" />
        <span className="">
          <a href={`mailto:${answer.email}`} className="text-primary">
            {answer.email}
          </a>
        </span>
      </span>
    </h3>
    <ul>
      <li>
        answered
        {` ${timeFormatter(answer.created_at)}`}
      </li>
      <li>
        <a href="/m" title="downvote answer">
          <i className="far fa-thumbs-down fa-fw" />
        </a>
        {answer.downvotes}
      </li>
      <li>
        <a href="/m" title="upvote answer">
          <i className="far fa-thumbs-up fa-fw" />
        </a>
        {answer.upvotes}
      </li>
      <li>
        {
          answer.is_accepted
          && <i className="fas fa-star fa-fw fa-spin" />
        }
        {
          !answer.is_accepted && userId === getItem('user_id')
          && <a href="/m"><i className="far fa-star fa-fw" /></a>
        }
      </li>
    </ul>
  </div>
);

AnswerCard.propTypes = {
  answer: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

export default AnswerCard;
