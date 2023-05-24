import "../css/profile.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/mutations';
import { QUERY_ONE_USER, QUERY_ALL_USERS } from "../utils/queries";

import Auth from '../utils/auth';

const ProfileSavedNames = () => {

}

export default ProfileSavedNames;