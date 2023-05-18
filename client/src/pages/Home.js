import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MATCHUPS } from "../utils/queries";
import React, { useState } from "react";

const Home = () => {
  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-footer text-center"></div>
    </div>
  );
};

export default Home;
