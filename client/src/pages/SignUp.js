import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from "../utils/auth";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("1.2", data);
      Auth.login(data.createUser.token);
    } catch (err) {
      console.log(formState);
      console.error(err);
    }
  };

  return (
    <main>
      <div className="card">
        <h3>Sign Up</h3>
        <div className="card-body">
          {false ? (
            <p>Welcome</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Username:"
                name="username"
                type="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Password:"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </button>
            </form>
          )}

          {error && <div>{error.message}</div>}
        </div>
      </div>
    </main>
  );
};

export default SignUp;
