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
        </div>
    )
}

export default ProfileBands;