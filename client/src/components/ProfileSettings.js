import React, { useState } from "react";

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

  const [usernameSuccessMsg, setUsernameSuccessMsg] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

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

    // Don't attempt a mutation if text box is empty
    if (formState.username) {
      setUsernameErrorMsg("");
      try {
        const { data } = await updateUsername({
          variables: { userID: __USERID, username: formState.username },
          onCompleted: () => setUsernameSuccessMsg("Username updated successfully")
        });
        console.log("1.2", data);
      } catch (err) {
        console.log(formState);
        console.error(err);
        setUsernameErrorMsg("That username is already taken");
      }
    } else {
      setUsernameErrorMsg("Username required");
      setUsernameSuccessMsg("");
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (formState.password && formState.password.length >= 8) {
      setPasswordErrorMsg("");
      try {
        const { data } = await updatePassword({
          variables: { userID: __USERID, password: formState.password },
          onCompleted: () => setPasswordSuccessMsg("Password updated successfully")
        });
        console.log("1.2", data);
      } catch (err) {
        console.log(formState);
        console.error(err);
      }
    } else {
      if (formState.password.length < 8) {
        setPasswordErrorMsg("Password must be at least 8 characters");
      } else {
        setPasswordErrorMsg("Password required");
      }
      setPasswordSuccessMsg("");
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
              <div className="error-msg">{usernameErrorMsg}</div>
              <button
                className="btn"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Update Username
              </button>
              <div>{usernameSuccessMsg}</div>
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
              <div className="error-msg">{passwordErrorMsg}</div>
              <button
                className="btn"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Update Password
              </button>
              <div>{passwordSuccessMsg}</div>
            </form>
            </>
          )}

          {/* {error && <div>{error.message}</div>} */}
        </div>
      </div>
    </main>
  );
};

export default ProfileSettings;
