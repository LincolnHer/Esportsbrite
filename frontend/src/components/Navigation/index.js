import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="splash-link">
          <NavLink to="/events/create" className="splash-create-link">
            Create an Event
          </NavLink>
        </div>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="splash-link">
          <NavLink to="/events/create" className="splash-create-link">
            Create an Event
          </NavLink>
        </div>
        <div className="splash-link">
          <NavLink to="/login" className="login-signup">
            Log In
          </NavLink>
        </div>
        <div className="splash-link">
          <NavLink to="/signup" className="login-signup">
            Sign Up
          </NavLink>
        </div>
      </>
    );
  }

  return (
    // <ul>
    //   <li>
    //     <NavLink exact to="/">Home</NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>
    <nav className="splash-nav">
      <NavLink exact to="/" className="home-link">
        esportsbrite
      </NavLink>
      <div className="splash-links">{isLoaded && sessionLinks}</div>
    </nav>
  );
}

export default Navigation;
