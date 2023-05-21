import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import "../css/navbar.css";

function Navbar() {
  let navigate = useNavigate();

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
            Spotify Search
          </p>
        </li>
        <li>
          <p className="nav-item" onClick={() => navigate("/allusers")}>
            See Users
          </p>
        </li>
      </ul>
      {Auth.loggedIn() ? (
        <>
          <p className="nav-item">Hello {Auth.getProfile().data.username}</p>

          <p className="nav-item" onClick={logout}>
            Log Out
          </p>
        </>
      ) : (
        <>
          <p className="nav-item" onClick={() => navigate("/signup")}>
            Sign Up
          </p>

          <p className="nav-item" onClick={() => navigate("/login")}>
            Log in
          </p>
        </>
      )}
    </div>
  );
}

export default Navbar;
