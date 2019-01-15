import React from 'react';
import PropTypes from 'prop-types';
import timeFormatter from '../../utilities/timeFormatter';
import { getItem } from '../../utilities/storage';

const AnswerCard = ({ answer, userId, displayModal }) => (
  <div className="box">
    <p className="text-lg mb-0">{answer.answer}</p>
    <p className="mb-0 text-md">
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
    </p>
    <ul className="text-md">
      <li>
        answered
        {` ${timeFormatter(answer.created_at)}`}
      </li>
      <li>
        <button type="button" className="btn" title="downvote answer">
          <i className="far fa-thumbs-down fa-fw" />
        </button>
        {answer.downvotes}
      </li>
      <li>
        <button type="button" className="btn" title="upvote answer">
          <i className="far fa-thumbs-up fa-fw" />
        </button>
        {answer.upvotes}
      </li>
      <li>
        {
          answer.is_accepted
          && <i className="fas fa-star fa-fw fa-spin" />
        }
        {
          !answer.is_accepted && userId === getItem('user_id')
          && (
            <button type="button" onClick={displayModal} className="btn">
              <i className="far fa-star fa-fw" id={answer.id} />
            </button>
          )
        }
      </li>
    </ul>
  </div>
);

AnswerCard.propTypes = {
  answer: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  displayModal: PropTypes.func,
};

AnswerCard.defaultProps = {
  displayModal: () => {},
};

export default AnswerCard;
