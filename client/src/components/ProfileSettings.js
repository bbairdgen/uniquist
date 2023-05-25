import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { UPDATE_USERNAME ,UPDATE_PASSWORD } from '../utils/mutations';

import Auth from "../utils/auth";

let __USERID = "";
  if (Auth.loggedIn()) {
      __USERID = Auth.getProfile().data?._id;
  }

const ProfileSettings = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [updateUsername, { error }] = useMutation(UPDATE_USERNAME);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await updateUsername({
        variables: { userID: __USERID, username: formState.username },
      });
      
      console.log("1.2", data);
    } catch (err) {
      console.log(formState);
      console.error(err);
    }
    
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        const { data } = await updatePassword({
          variables: { userID: __USERID, password: formState.password },
        });
        
        console.log("1.2", data);
      } catch (err) {
        console.log(formState);
        console.error(err);
      }
        
  };

  return (
    <main id="settings">
      <div className="card">
        <h3>Settings</h3>
        <div className="card-body">
          {false ? (
            <p>Welcome</p>
          ) : (
            <>
            <form onSubmit={handleUsernameSubmit}>
              <input
                className="form-input"
                placeholder="New Username:"
                name="username"
                type="username"
                value={formState.username}
                onChange={handleChange}
              />
              <button
                className="btn"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Update Username
              </button>
            </form>
            <form onSubmit={handlePasswordSubmit}>
              <input
                className="form-input"
                placeholder="New Password:"
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
                Update Password
              </button>
            </form>
            </>
          )}

          {error && <div>{error.message}</div>}
        </div>
      </div>
    </main>
  );
};

export default ProfileSettings;
