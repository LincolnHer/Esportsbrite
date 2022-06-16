import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import "./Navigation.css"

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <div className="splash-link-profile"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <i className="fas fa-user-circle" />
        <span className="profile-email">{user.email}</span>
      {showMenu && (
        <div className="profile-dropdown"
        >
          <div className="menu">
            <NavLink to="/events/all">
              Manage my events
            </NavLink>
          </div>
          <div onClick={logout} className="menu">Log Out</div>
        </div>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
