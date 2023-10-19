import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTable,
  faClipboardList,
  faBagShopping,
  faDoorOpen,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';

function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  //
  return (
    <div className="container-fluid bg-light">
      <nav className="navbar navbar-expand navbar-light">
        <Link to="/" className="navbar-brand font-weight-bolder">
          ESON&apos;s RTW
        </Link>
        {user && user.isAdmin && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-white text-dark border"
                href="/"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{user.username}</span>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/">
                  {user.gender === 'male' ? (
                    <img
                      src="/images/users-icon/male.svg"
                      className="drop-down-icon mr-2"
                      alt="male-profile"
                    />
                  ) : (
                    <img
                      src="/images/users-icon/female.svg"
                      alt="female-profile"
                    />
                  )}
                  Profile
                </a>

                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  <FontAwesomeIcon
                    icon={faTable}
                    className="drop-down-icon mr-2"
                  />
                  Dashboard
                </a>

                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="drop-down-icon mr-2"
                  />
                  Orders
                </a>

                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="drop-down-icon mr-2"
                  />
                  Products
                </a>

                <hr className="dropdown-divider" />
                <button
                  className="btn btn-secondary dropdown-item"
                  onClick={handleClick}
                  type="submit"
                >
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    className="drop-down-icon mr-2"
                  />
                  Log out
                </button>
              </div>
            </li>
          </ul>
        )}

        {user && !user.isAdmin && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link mr-3 text-dark">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-white text-dark border"
                href="/"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{user.username}</span>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/">
                  {user.gender === 'male' ? (
                    <img
                      src="/images/users-icon/male.svg"
                      className="drop-down-icon mr-2"
                      alt="male-profile"
                    />
                  ) : (
                    <img
                      src="/images/users-icon/female.svg"
                      alt="female-profile"
                    />
                  )}
                  Profile
                </a>

                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  <FontAwesomeIcon
                    icon={faTable}
                    className="drop-down-icon mr-2"
                  />
                  Dashboard
                </a>

                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="drop-down-icon mr-2"
                  />
                  Orders
                </a>

                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="drop-down-icon mr-2"
                  />
                  Products
                </a>

                <hr className="dropdown-divider" />
                <button
                  className="btn btn-secondary dropdown-item"
                  onClick={handleClick}
                  type="submit"
                >
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    className="drop-down-icon mr-2"
                  />
                  Log out
                </button>
              </div>
            </li>
          </ul>
        )}

        {!user && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
