import "../css/spotify.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND, ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/mutations';
import { QUERY_ONE_USER, QUERY_ALL_USERS } from "../utils/queries";

import Auth from '../utils/auth';

const Profile = () => {
    const { profileID } = useParams();

    // TODO: If no params and user is not logged in, prompt to sign in / up with links

    if (Auth.loggedIn() && !profileID) {
        
    }

    const oneUser = useQuery(
        QUERY_ONE_USER,
        { variables: { id: profileID } }
    );

    const allUsers = useQuery(QUERY_ALL_USERS);
    // console.log("all users:", allUsers);

    const addFriend = useMutation(ADD_FRIEND);

    function handleAddFriend(e) {
        let friendID = e.target.parentElement.getAttribute("userid");
        if (e.target.textContent === "FOLLOW") {
            addFriend({
                variables: { 
                    userID: Auth.getProfile().data._id,
                    friendID
                }
            })
            e.target.textContent = "FOLLOWING"
        } else e.target.textContent = "FOLLOW"
    }

    return (
        <div className="profile-page">
            <aside className="left-sidebar">
                <a href="#settings">Settings</a>
                <a href="#bands">Bands</a>
                <a href="#saved-names">Saved Band Names</a>
                <a href="#following">Following</a>
            </aside>
            {/* <h2>{oneUser.data.user.username}</h2> */}
            <aside className="right-sidebar">
                <h4>Follow people!</h4>
                {
                    allUsers.loading
                    ? ( <p>loading...</p> )
                    : ( 
                        allUsers.data.users.map((user, i) => {
                            if (i < 20) {
                                return (
                                    <div key={user._id} userid={user._id} className="user">
                                        <p>{user.username}</p>
                                        <button
                                            type="button"
                                            onClick={handleAddFriend}
                                        >FOLLOW</button>
                                    </div>
                                )
                            } else return null;
                        })
                      )
                }
            </aside>
        </div>
    )
    
}