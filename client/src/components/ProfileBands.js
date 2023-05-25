import '../css/profile.css';

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { UPDATE_USERNAME ,UPDATE_PASSWORD } from '../utils/mutations';

import Auth from "../utils/auth";

const ProfileBands = ({ user, onMyProfile }) => {

    const mineOrTheir = onMyProfile ? "My " : `${user.username}'s `;

    return (
        <div>
            <h3>{mineOrTheir}Bands</h3>
            <div className="user-bands">
                {user.bands.map((band) => {
                    return (
                        <div key={band._id} className="band-card">
                            <Link to={`../bands/${band._id}`} className="band-link">{band.bandname}</Link>
                        </div>
                    )
                })}
            </div>
            <Link to="./new-band" className='create-band-link'>+ CREATE NEW BAND</Link>
        </div>
    )
}

export default ProfileBands;