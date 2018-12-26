import React from 'react';
import { Link } from 'react-router-dom';
import { getItem } from '../../utilities/storage';

const UserNav = () => (
  <div>
    <li className="d-inline mr-3">
      <Link to="/profile">
        <i className="far fa-user mr-1" />
        Hi
        {` ${getItem('name').split(' ')[1]}`}
      </Link>
    </li>
    <li className="d-inline mr-3">
      <Link className="text-success p-large js-question" to="#/">
        Ask a question
      </Link>
    </li>
    <li className="d-inline logout-btn">
      <Link to="/logout" className="text-success">
        <i className="fa fa-power-off fa-lg" title="Log Out" />
      </Link>
    </li>
  </div>
);

export default UserNav;
