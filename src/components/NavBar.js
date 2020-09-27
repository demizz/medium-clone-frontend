import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav className="navbar navbar-light ">
      <div className="container">
        <Link to="/" className="navbar-brand">
          React Js World
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              home
            </NavLink>
          </li>
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
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
