import "../css/profile.css";
import React, { useState } from "react";

import { useMutation } from '@apollo/client';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/mutations';
// import { QUERY_ONE_USER } from "../utils/queries";

import Auth from '../utils/auth';

let __USERID = "";
if (Auth.loggedIn()) {
    __USERID = Auth.getProfile().data?._id;
}

const ProfileSavedNames = ({ user, onMyProfile }) => {
    // STATE FIRST
    const [newFaveInput, setNewFaveInput] = useState("");
    
    // QUERIES AND MUTATIONS
    const [addFavorite] = useMutation(ADD_FAVORITE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE);


    // Special UX string which changes based on whether you're viewing
    // your own profile or someone else's.
    const mineOrTheir = onMyProfile ? "My " : `${user.username}'s `;

    function handleAdd(e) {
        e.preventDefault();

        // disallow saving empty favorites
        if (newFaveInput) {
            addFavorite({
                variables: {
                    userID: __USERID,
                    text: newFaveInput
                },
                onCompleted: () => setNewFaveInput("")
            });
        }
    }

    function handleDelete(e) {
        let favoriteText = e.target.parentElement.getAttribute("favorite");

        removeFavorite({
            variables: {
                userID: __USERID,
                text: favoriteText
            }
        });
    }


    return (
        <div id="saved-names">
            <h3>{mineOrTheir}Saved Band Names</h3>
            {onMyProfile ? (
                <form className="favorite-form">
                    <input
                        placeholder="New band name idea"
                        type="text"
                        value={newFaveInput}
                        onChange={(e) => setNewFaveInput(e.target.value)}
                    />
                    <button onClick={handleAdd}>ADD</button>
                </form>
            ) : null}

            {user.favorites.map((favorite) => {
                return (
                    <div key={favorite} favorite={favorite} className="favorite-card">
                        <p className="favorite-text">{favorite}</p>
                        {onMyProfile
                        ? <button className="delete-icon" onClick={handleDelete}>X</button>
                        : null}
                    </div>
                )
            })}
        </div>
    )
}

export default ProfileSavedNames;