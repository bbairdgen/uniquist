import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth"
import "../css/navbar.css";

function Navbar() {
  const [content, setContent] = useState();
  let navigate = useNavigate();
  //to do: setContent(About) for default
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
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
        {Auth.loggedIn() ? ( 
          <>
            <li>
              <p className="nav-item" onClick={() => navigate("/profile")}>
                {Auth.getProfile().data.username}'s Profile
              </p>
            </li>
            <li>
              <p className="nav-item" onClick={() => navigate("/settings")}>
                Settings
              </p>
            </li>
            <li>
              <p className="nav-item" onClick={logout}>Log Out</p>
            </li>
          </>
        ) : (
          <>
            <li>
              <p className="nav-item" onClick={() => navigate("/signup")}>
                Sign Up
              </p>
            </li>
            <li>
              <p className="nav-item" onClick={() => navigate("/login")}>
                Log in
              </p>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
