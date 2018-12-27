import React from 'react';
import { Link } from 'react-router-dom';
import { getItem } from '../../utilities/storage';

const UserNav = () => (
  <div>
    <li className="d-inline mr-3">
      <Link to={`/users/${getItem('name')}/profile`}>
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
        <i className="fa fa-power-off fa-lg mr-1" title="Log Out" />
        <span className="show-sm">Log out</span>
      </Link>
    </li>
  </div>
);

export default UserNav;
