import "../css/feed.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import { CREATE_BAND } from "../utils/mutations";

import Auth from '../utils/auth';

let __USER;
if (Auth.loggedIn()) {
    __USER = Auth.getProfile().data;
}

const Feed = () => {



    return (
        <div className='feed-page'>
            <h1>My Feed</h1>
            <button type="button" className="btn">
                Create new post
            </button>
        </div>
    )
};

export default Feed;