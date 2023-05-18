import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/navbar.css";

import Spotify from "../pages/Spotify";

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
      </ul>
    </div>
  );
}

export default Navbar;
