import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUser';
const NavBar = () => {
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const userImage =
    (currentUserState.loggedIn &&
      currentUserState.currentUser &&
      currentUserState.currentUser.image) ||
    'https://static.productionready.io/images/smiley-cyrus.jpg';
  return (
    <nav className="navbar navbar-light ">
      <div className="container">
        <Link to="/" className="navbar-brand">
          React Js World
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {currentUserState.loggedIn === false && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  signup
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {currentUserState.loggedIn === true && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose">&nbsp; New Post</i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className="ion-gear-a">&nbsp; Settings</i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className="nav-link"
                >
                  &nbsp; {currentUserState.currentUser.username}
                  <img
                    src={userImage}
                    alt="
                   "
                    className="user-pic"
                  />
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
