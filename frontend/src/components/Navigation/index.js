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
          <a
            href="https://github.com/LincolnHer"
            target="_blank"
            rel="noreferrer"
          >
            <div className="splash-create-link-icons">
              <i className="fa-brands fa-github fa-2x"></i>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/lincoln-her/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="splash-create-link-icons">
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </div>
          </a>
          <NavLink to="/events/create">
            <div className="splash-create-link">
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
          <a
            href="https://github.com/LincolnHer"
            target="_blank"
            rel="noreferrer"
          >
            <div className="splash-create-link-icons">
              <i className="fa-brands fa-github fa-2x"></i>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/lincoln-her/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="splash-create-link-icons">
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </div>
          </a>
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
