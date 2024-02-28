import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { handleUserRegister } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password1: "",
    password2: "",
  });

  function handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  }

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => handleUserRegister(e, credentials)}>
          <div className="field--wrapper">
            <label htmlFor="email">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your username..."
              value={credentials.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
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
              name="password1"
              id="password1"
              placeholder="Enter password..."
              value={credentials.password1}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field--wrapper">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Enter password..."
              value={credentials.password2}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field--wrapper">
            <input
              type="submit"
              value="Login"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>
        <p>
          Already have an account? Login <Link to={"/login"}>here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
