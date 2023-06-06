import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import "../css/navbar.css";

const Navbar = () => {
  let navigate = useNavigate();

  // NOAH'S NOTE 5/23/2023 9:52 PM MDT
  // This is here so that clicking "My Profile" will send you to `profile/${userID}`
  // It's initialized empty because it doesn't assume you're logged in and authorized.
  // However, at least once in the past it did not update this string for some reason.
  // I couldn't figure out why, and then it just started working as expected.
  // So just warning y'all, if the "My Profile" button doesn't take you anywhere,
  // then that means this code is inconsistent and we'll probably need to
  // implement global state.
  let __USERID = "";
  let __USERNAME = "";
  if (Auth.loggedIn()) {
    //console.log("AUTH SAYS:", Auth.getProfile());
    __USERID = Auth.getProfile().data?._id;
    __USERNAME = Auth.getProfile().data?.username;
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <ul className="nav-list">
        <li>
          <p className="nav-item" onClick={() => navigate("/")}>
            Home
          </p>
        </li>
        <li>
          <p className="nav-item" onClick={() => navigate("/search")}>
            Search
          </p>
        </li>
        <li>
          <p className="nav-item" onClick={() => navigate("/allusers")}>
            See Users
          </p>
        </li>
        {Auth.loggedIn() ? (
          <li>
            <p
              className="nav-item"
              onClick={() => navigate(`/profile/${__USERID}`)}
            >
              My Profile
            </p>
          </li>
        ) : (
          <></>
        )}
      </ul>
      {Auth.loggedIn() ? (
        <>
          <p>Logged in as {__USERNAME}</p>
          <p className="nav-item logout-btn" onClick={logout}>
            Log Out
          </p>
        </>
      ) : (
        <>
          <p className="stuff login-btn" onClick={() => navigate("/login")}>
            Login/Sign Up
          </p>
        </>
      )}
    </div>
  );
};

export default Navbar;
