import '../css/profile.css';

import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_ALL_BANDS } from '../utils/queries';

// import Auth from "../utils/auth";

const ProfileBands = ({ user, onMyProfile }) => {

    const allBands = useQuery(QUERY_ALL_BANDS);
    // if (!allBands.loading) console.log("allBands:", allBands); // debug

    // UX enhancement. Display `My ` when on your own profile.
    const mineOrTheir = onMyProfile ? "My " : `${user.username}'s `;

    return (
        <div>
            <h3>{mineOrTheir}Bands</h3>
            <div className="user-bands">
                {allBands.loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                    {allBands.data?.bands.map((band) => {
                        return (
                            <div key={band._id} className='user-band'>
                                {band.members.map((member) => {
                                    if (member.username === user.username) {
                                        return (
                                            <div key={band._id}>
                                                <Link to={`/bands/${band._id}`}>{band.bandname}</Link>
                                            </div>
                                        )
                                    } else return null;
                                })}
                            </div>
                        )
                    })}
                    </>
                )}
            </div>
            {onMyProfile ? (
                <Link to="./new-band" className='create-band-link'>+ CREATE NEW BAND</Link>
            ) : null}
        </div>
    )
}

export default ProfileBands;