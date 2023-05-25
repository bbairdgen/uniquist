import "../css/profile.css";
// import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import { QUERY_ONE_USER, QUERY_ALL_USERS } from "../utils/queries";

import Auth from '../utils/auth';

import NotFound from "./NotFound";
import ProfileSettings from "../components/ProfileSettings";
import ProfileBands from "../components/ProfileBands";
import ProfileSavedNames from "../components/ProfileSavedNames";
import ProfileFollowing from "../components/ProfileFollowing";

const Profile = () => {
    const allUsers = useQuery(QUERY_ALL_USERS);
    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    
    // Check if we're on the profile page of the currently logged-in user.
    // If not, we are not 'on my profile'.
    // User ID will always be in the URL bar when rendering this page,
    // so we grab it from there and compare it to our JWT.
    const { profileID } = useParams();
    // console.log("profileID:", profileID); // debug

    let __USERID = "";
    if (Auth.loggedIn()) {
        __USERID = Auth.getProfile().data?._id;
    }

    // If you're viewing your profile, some text elements should be different.
    // You shouldn't be "Welcome,"d on another user's page.
    // These special strings will be set according to whether the param
    // in the URL matches the currently logged in user's ID or not.
    let onMyProfile = false;
    let MY = "";
    let WELCOME = "";
    let S_PAGE = "'s Page";
    if (__USERID === profileID) {
        onMyProfile = true;
        MY = "My ";
        WELCOME = "Welcome, ";
        S_PAGE = "";
    }
    // No matter which user's page we're on, use profileID to query that user.
    const oneUser = useQuery(
        QUERY_ONE_USER,
        { variables: { userID: profileID } }
    );
    // Extract all the user ID's from all this user's friends.
    // This is used in the renderIfFollowing function below.
    const oneUserFriendIDs = oneUser.data?.user.friends.map((friend) => friend._id);


    function handleFollowButton(e) {
        // Use e.target to extract our custom `userid` attribute,
        // which has the userID of the friend the user elected to follow
        let friendID = e.target.parentElement.getAttribute("userid");

        // If the button said "FOLLOW" when clicked, execute addFriend mutation.
        // Else execute removeFriend mutation.
        if (e.target.textContent === "FOLLOW") {
            addFriend({
                variables: { 
                    userID: __USERID,
                    friendID: friendID
                },
                onCompleted: () => e.target.textContent = "FOLLOWING"
            });
        } else {
            removeFriend({
                variables: {
                    userID: __USERID,
                    friendID: friendID
                },
                onCompleted: () => e.target.textContent = "FOLLOW"
            });
        }
    }

    function renderIfFollowing(id) {
        // Informs the user if they are already following a user
        // on the right side panel.
        return oneUserFriendIDs.includes(id) ? "FOLLOWING" : "FOLLOW";
    }


    return (
        <>
        {oneUser.loading ? <p>Loading...</p> : (
            <>
            {!oneUser.data ? <NotFound /> : (
                <div className="profile-page">


                    <aside className="left-sidebar">
                        {onMyProfile ? <a href="#settings">Settings</a> : null}
                        {/* `MY` renders "My " if viewing your own profile */}
                        <a href="#bands">{MY}Bands</a>
                        <a href="#saved-names">{MY}Saved Band Names</a>
                        <a href="#following">Following</a>
                    </aside>


                    <section className="profile-body">
                        <div userid={oneUser.data?.user._id}>
                            <h2>{WELCOME}{oneUser.data?.user.username}{S_PAGE}</h2>
                            {!onMyProfile
                                ? (
                                    <button
                                        type="button"
                                        className="follow-btn"
                                        onClick={handleFollowButton}
                                    >{renderIfFollowing(oneUser.data?.user._id)}</button>
                                )
                                : ( null )
                            }
                        </div>
                        {onMyProfile ? (<> <hr/> <ProfileSettings /> </>) : null}
                        <hr/>
                        <ProfileBands user={oneUser.data?.user} onMyProfile={onMyProfile} />
                        <hr/>
                        <ProfileSavedNames user={oneUser.data?.user} onMyProfile={onMyProfile} />
                        <hr/>
                        <ProfileFollowing
                            user={oneUser.data?.user}
                            onMyProfile={onMyProfile}
                        />
                    </section>


                    <aside className="right-sidebar">
                        {
                            allUsers.loading
                            ? (<p>loading...</p> )
                            : (
                                profileID === __USERID
                                ? (
                                    <>
                                    <h4>Follow people!</h4>
                                    {allUsers.data?.users.map((user, i) => {
                                        if (i <= 20 && user._id !== __USERID) {
                                            return (
                                                <div key={user._id} userid={user._id} className="user-card">
                                                    <a href={user._id}>{user.username}</a>
                                                    <button
                                                        type="button"
                                                        className="follow-btn"
                                                        onClick={handleFollowButton}
                                                    >{renderIfFollowing(user._id)}</button>
                                                </div>
                                            )
                                        } else return null;
                                    })}
                                    </>
                                )
                                : (
                                    <div className="empty-right-sidebar"></div>
                                )
                                
                            )
                        }
                    </aside>
                </div>
            )}
            </>
        )}
        </>
    )
    
}

export default Profile;