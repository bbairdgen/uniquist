import "../css/spotify.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND, ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/mutations';
import { QUERY_ONE_USER, QUERY_ALL_USERS } from "../utils/queries";

import Auth from '../utils/auth';

import NotFound from "./NotFound";

const Profile = () => {
    const allUsers = useQuery(QUERY_ALL_USERS);
    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    
    // Check if we're on the profile page of the currently logged-in user.
    // If not, we are not 'on my profile'.
    // User ID will always be in the URL bar when rendering this page,
    // so we grab it from there and compare it to our JWT.
    const { profileID } = useParams();
    let onMyProfile = false;
    let MY = "";
    if (Auth.getProfile().data._id === profileID) {
        onMyProfile = true;
        MY = "My ";
    }
    // No matter what user's page we're on, be it the currently signed-in one
    // or some other user, we use profileID to query them.
    const oneUser = useQuery(
        QUERY_ONE_USER,
        { variables: { id: profileID } }
    );

    // If our query.data returns empty, then that user doesn't exist
    // and the app navigates to the NotFound page.
    if (!oneUser.data) {
        console.error("Error: no user found with that profileID");
        return <NotFound />
    }


    function handleFollowButton(e) {
        // Use e.target to extract our custom `userid` attribute,
        // which has the userID of the friend the user elected to follow
        let friendID = e.target.parentElement.getAttribute("userid");

        // If the button said "FOLLOW" when clicked, execute addFriend mutation.
        // Else execute removeFriend mutation.
        if (e.target.textContent === "FOLLOW") {
            addFriend({
                variables: { 
                    userID: Auth.getProfile().data._id,
                    friendID: friendID
                }
            });
            e.target.textContent = "FOLLOWING"
        } else {
            removeFriend({
                variables: {
                    userID: Auth.getProfile().data._id,
                    friendID: friendID
                }
            });
            e.target.textContent = "FOLLOW"
        }
    }

    function handleAddFavorite(e) {

    }

    function handleRemoveFavorite(e) {

    }

    

    return (
        <div className="profile-page">
            <aside className="left-sidebar">
                {onMyProfile ? <a href="#settings">Settings</a> : null}
                {/* `MY` renders "My " if viewing your own profile */}
                <a href="#bands">{MY}Bands</a>
                <a href="#saved-names">{MY}Saved Band Names</a>
                <a href="#following">Following</a>
            </aside>
            <section className="profile-body">
                <h2>{oneUser.data.user.username}</h2>

            </section>
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
                                        <a href={user._id}>{user.username}</a>
                                        <button
                                            type="button"
                                            onClick={handleFollowButton}
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

export default Profile;