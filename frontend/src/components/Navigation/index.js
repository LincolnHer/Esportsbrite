import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="splash-links">
          <NavLink to="/events/create">
            <div className="splash-create-link-2">
              <i className="fa-regular fa-square-plus"></i>
              Create an Event
            </div>
          </NavLink>
          <NavLink to="/tickets">
            <div className="splash-ticket">
              <i className="fa-solid fa-ticket"></i>
              Tickets
            </div>
          </NavLink>
        </div>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="splash-link">
          <NavLink to="/events/create" className="splash-create-link-2">
            Create an Event
          </NavLink>
        </div>
        <NavLink to="/login" className="splash-create-link-3">
          <div>Log In</div>
        </NavLink>
        <NavLink to="/signup" className="splash-create-link-3">
          <div>Sign Up</div>
        </NavLink>
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
