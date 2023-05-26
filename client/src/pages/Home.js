import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import React, { useState } from "react";
import AddFavorite from '../components/AddFavorite';
import "../css/home.css";

import NameGenerator from "../components/NameGenerator";

// import { rapidApiKey, randomApiKey } from '/utils/keys'
// require('dotenv').config()

const Home = () => {

  return (
    <div className="homepage">
      <section className="home-about">
        <hr/>
        <h2 className="home-welcome">Welcome to Uniquist</h2>
        <p>
          UNIQUIST is an effort to create a worldwide community of musical artists,
          and to empower upcoming artists with the art of uniqueness. In an era
          defined by the democratization and unprecedented accessibility of music
          making tools, everyone deserves an opportunity to set themselves apart
          from their musical peers. UNIQUIST aims to help you get there.
        </p>
        <br/>
        <p>
          Here on our homepage is one of the pillars of this mission: the Band Name
          Generator. Though still in its infancy, you might find it quite useful.
          Just type in a list of words related to your ideal band name (the more
          the better!), and it will mash your ideas into a digestible two-word
          package.
        </p>
      </section>
      <NameGenerator />
    </div>
  );
};

export default Home;
