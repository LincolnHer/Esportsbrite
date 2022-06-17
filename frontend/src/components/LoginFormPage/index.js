import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        const filterErr = data?.errors?.filter(error => error !== "Invalid value")
        if (data && data.errors) setErrors(filterErr);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ credential: "Faker@aa.io", password: "password" })
    );
  };

  return (
    <div className="split-container">
      <div className="split-left">
        <div className="left-content">
          <NavLink exact to="/" className="home-link">
            esportsbrite
          </NavLink>
          <h1 className="create-login">Log in</h1>
          <form onSubmit={handleSubmit} className="split-content form">
            <ul className="errors">
              {errors?.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                // required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
            </label>
            <button type="submit" className="auth-btn">
              Log In
            </button>
          </form>
          <div className="divider">
            <div className="divider-text">or</div>
          </div>
          <button type="button" className="auth-btn" onClick={demoLogin}>
            Demo
          </button>
          <NavLink to="/signup" className="signup-login-link">
            Sign up
          </NavLink>
        </div>
      </div>
      <div className="split-right">
        <div className="right-content2"></div>
      </div>
    </div>
  );
}

export default LoginFormPage;
