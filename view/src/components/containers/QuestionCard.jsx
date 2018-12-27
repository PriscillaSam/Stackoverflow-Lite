import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import timeFormatter from '../../utilities/timeFormatter';

const QuestionCard = ({ question }) => (
  <div className="box">
    <h3 className="mb-0 mt-0 display-3">
      <Link to={`/questions/${question.id}`} className="text-success">
        {question.question}
      </Link>
    </h3>
    <ul>
      <li>{timeFormatter(question.created_at)}</li>
      <li>
        <i className="far fa-comments fa-fw" />
        {question.answers}
      </li>
      {
        question.name
          ? (
            <li>
              <i className="far fa-user fa-fw " />
              {question.name}
            </li>
          )
          : (
            <li>
              <i
                className="far fa-trash-alt fa-fw"
                style={{ color: '#FF4500' }}
              />
            </li>
          )
      }
    </ul>
  </div>
);

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionCard;
