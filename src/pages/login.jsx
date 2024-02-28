import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    let name = e.target.name
    let value = e.target.value

    setCredentials({ ...credentials, [name]: value })
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => handleUserLogin(e, credentials)}>
          <div className="field--wrapper">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field--wrapper">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password..."
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field--wrapper">
            <input type="submit" value="Login" className="btn btn--lg btn--main" />
          </div>
        </form>
        <p>Don't have an account? Register <Link to={'/register'}>here</Link></p>
      </div>
    </div>
  );
};

export default Login;
