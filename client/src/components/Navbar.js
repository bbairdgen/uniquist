import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/navbar.css";

function Navbar() {
  const [content, setContent] = useState();
  let navigate = useNavigate();
  //to do: setContent(About) for default

  return (
    <div>
      <ul className="nav-list">
        <li>
          <p className="nav-item" onClick={() => navigate("/search")}>
            Spotify Search
          </p>
        </li>
        <li>
          <p className="nav-item" onClick={() => navigate("/")}>
            Home
          </p>
        </li>
        <li>
          <p className="nav-item" onClick={() => navigate("/signup")}>
            Sign Up
          </p>
        </li>
        <li>
          <p className="nav-item" onClick={() => navigate("/login")}>
            Log in
          </p>
          <p className="nav-item" onClick={() => navigate("/allusers")}>
            See Users
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
