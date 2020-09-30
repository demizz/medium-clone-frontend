import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUser';
const FeedToggler = ({ tagName }) => {
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  return (
    <div className="feed-toggler">
      <ul className="nav nav-pills outline-active">
        {currentUserState.loggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              Your feed{' '}
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Global Feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className="nav-link">
              <i className="ion-pourd">{tagName}</i>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggler;
