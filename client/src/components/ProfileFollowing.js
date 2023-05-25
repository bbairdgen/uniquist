import "../css/profile.css";
import React from "react";

import { useMutation } from '@apollo/client';
import { REMOVE_FRIEND } from '../utils/mutations';
// import { QUERY_ONE_USER } from "../utils/queries";

import Auth from '../utils/auth';

const ProfileFollowing = ({ user, onMyProfile }) => {
    
    const [removeFriend] = useMutation(REMOVE_FRIEND);

    function handleUnfollow(e) {
        let friendID = e.target.parentElement.getAttribute('friendid');

        removeFriend(
            {
                variables: {
                    userID: user._id,
                    friendID
                }
            }
        )
    }
    
    return (
        <div id="following" className="profile-following">
            <h3>Following</h3>
            {!user.friends.length ? (
                <h4>Not following anyone yet!</h4>
            ) : (
                <>
                {user.friends.map((friend) => {
                    return (
                        <div
                            key={friend._id}
                            friendid={friend._id}
                            className={`friend-card${onMyProfile ? "" : " center-names"}`}>
                                <a href={friend._id}>{friend.username}</a>
                                {onMyProfile ? (
                                    <button
                                        type="button"
                                        className="follow-btn unfollow-btn"
                                        onClick={handleUnfollow}
                                    >UNFOLLOW</button>
                                ) : null}
                        </div>
                    )
                })}
                </>
            )}
        </div>
    )
}

export default ProfileFollowing;