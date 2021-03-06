import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        const filterErr = data?.errors?.filter(error => error !== "Invalid value")
        if (data && data.errors) setErrors(filterErr);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
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
          <h1 className="create-login">Create an account</h1>
          <form onSubmit={handleSubmit} className="split-content form">
            <ul className="errors">
              {errors?.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
            </label>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // required
              />
            </label>
            <button type="submit" className="auth-btn">
              Sign Up
            </button>
          </form>
          <div className="divider">
            <div className="divider-text">or</div>
          </div>
          <button type="button" className="auth-btn" onClick={demoLogin}>
            Demo
          </button>
          <NavLink to="/login" className="signup-login-link">
            Log In
          </NavLink>
        </div>
      </div>
      <div className="split-right">
        <div className="right-content"></div>
      </div>
    </div>
  );
}

export default SignupFormPage;
