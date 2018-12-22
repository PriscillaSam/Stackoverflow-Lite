import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import timeFormatter from '../../utilities/timeFormatter';

const QuestionCard = ({ question }) => (
  <div className="box">
    <h3 className="mb-0 mt-0 display-3">
      <Link to={`questions/${question.id}`} className="text-success">
        {question.question}
      </Link>
    </h3>
    <ul>
      <li>{timeFormatter(question.created_at)}</li>
      <li>
        <i className="fa fa-comments-o fa-fw" />
        {question.answers}
      </li>
      <li>
        <i className="fa fa-user-o fa-fw " />
        {question.name}
      </li>
    </ul>
  </div>
);

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionCard;
