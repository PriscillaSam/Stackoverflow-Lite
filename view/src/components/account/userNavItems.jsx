import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getItem } from '../../utilities/storage';

const UserNav = ({ displayModal, displayQuestionLink }) => (
  <div>
    <li className="d-inline mr-3">
      <Link to={`/users/${getItem('name').split(' ').join('')}/profile`}>
        <i className="far fa-user mr-1" />
        Hi
        {` ${getItem('name').split(' ')[0]}`}
      </Link>
    </li>
    {
      displayQuestionLink
      && (
        <li className="d-inline mr-3">
          <a
            className="text-success"
            href="#/"
            data-testid="display-modal-btn"
            onClick={displayModal}
          >
            <span className="show-sm">
              <i className="far fa-edit mr-1" />
            </span>
            Ask a question
          </a>
        </li>
      )
    }

    <li className="d-inline logout-btn">
      <Link to="/logout" className="text-success">
        <i className="fa fa-power-off fa-lg mr-1" title="Log Out" />
        <span className="show-sm">Log out</span>
      </Link>
    </li>
  </div>
);

UserNav.propTypes = {
  displayModal: PropTypes.func,
  displayQuestionLink: PropTypes.bool.isRequired,
};

UserNav.defaultProps = {
  displayModal: () => {},
};

export default UserNav;
