import "../css/createBand.css";
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

const CreateBand = () => {
    
    const { loading, data } = useQuery(QUERY_ALL_USERS);
    const [createBand] = useMutation(CREATE_BAND);

    const [newBandName, setNewBandName] = useState("");
    const [userSearchInput, setUserSearchInput] = useState("");
    const [userResults, setUserResults] = useState([]);
    const [membersToAdd, setMembersToAdd] = useState([__USER]);
    const [streamLinks, setStreamLinks] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // useEffect to search users as soon as user types into search bar
    useEffect(() => {
        // Only set results if the query was successful
        // and if there is something in the search bar
        if (data && userSearchInput) {
            //console.log("data:", data)
            // map through data, collect usernames that have search characters
            let results = data.users.filter(
                (user) => (
                    // include user only if username contains search term
                    user.username.toLowerCase().includes(userSearchInput)
                    &&
                    // exclude user from search results if already added
                    !membersToAdd.includes(user)
                    // &&
                    // // exclude currently logged in user
                    // !membersToAdd.includes(__USER)
                )
            );

            setUserResults([...results]);
        } else {
            // remove all results when search bar is empty
            setUserResults([]);
        }
        // Updates when data changes (new user is created)
        // or when content of search bar changes
    }, [data, userSearchInput, membersToAdd]);
    

    function handleCreateBand(e) {
        e.preventDefault();

        // console.log("entered band name:", newBandName); // debug

        // Prevent submission and display error if no band name entered
        // when CREATE BAND button clicked.
        if (!newBandName) {
            setErrorMsg("Band name field is required");
        } else {
            // Once the band name box has content and button is clicked,
            // get rid of error message.
            setErrorMsg("");
        }

        let memberIDs = membersToAdd.map((member) => member._id)

        createBand({
            variables: {
                bandname: newBandName,
                members: memberIDs,
                streamLinks,
            },
            onCompleted: (bandData) => {

                // remove button so it can't be clicked again during timeout
                e.target.remove();
                setSuccessMsg("Band created successfully!");

                // console.log("bandData:", bandData);

                setTimeout(window.location.assign(`/bands/${bandData.createBand._id}`), 20000);
            }
        })

    }

    return (
        <div>
            <h2>Create New Band</h2>
            <form>
                <input
                    required
                    type="text"
                    placeholder="Band name"
                    onChange={(e) => setNewBandName(e.target.value)}
                />
                {errorMsg ? ( <p className="error-msg">{errorMsg}</p> ) : null}
                <div>
                    <input
                        id="streamlink-input"
                        type="text"
                        placeholder="Link to your music"
                    />
                    <button
                        type="button"
                        className="add-remove"
                        onClick={() => {
                            // get input value
                            let linkToAdd = document.getElementById("streamlink-input").value;
                            // check if already added, don't add if it is
                            if (!streamLinks.includes(linkToAdd)) {
                                setStreamLinks( [...streamLinks, linkToAdd] );
                            }
                        }}
                    >ADD</button>
                </div>
                <div>
                    {streamLinks.length ? (<p>WHERE TO FIND YOU:</p>) : null}
                    {streamLinks.map((link) => <p key={link}>{link}</p>)}
                </div>
                <input
                    type="text"
                    placeholder="Search for members..."
                    onChange={(e) => setUserSearchInput(e.target.value)}
                />
                <div className="members-to-add">
                    {membersToAdd.length ? <p>MEMBERS:</p> : null}
                    {membersToAdd.length ? (
                        <>
                        {membersToAdd.map((member) => {
                            return (
                                <div key={member._id} className="member-card">
                                    <p>{member.username}</p>
                                    <button
                                        type="button"
                                        className="add-remove"
                                        onClick={(e) => {
                                            // safecopy membersToAdd, splice removed member
                                            let updatedMemberList = [...membersToAdd];
                                            updatedMemberList.splice(updatedMemberList.indexOf(member), 1);
                                            setMembersToAdd([...updatedMemberList]);
                                            // refresh results to put removed member back in
                                            setUserResults([...userResults]);
                                        }}
                                    >REMOVE</button>
                                </div>
                            )
                        })}
                        </>
                    ) : null}
                </div>
                <button
                    className="create-band-btn btn"
                    onClick={handleCreateBand}
                >CREATE BAND</button>
                {successMsg ? <p>{successMsg}</p> : null}
                {errorMsg ? (<p className="error-msg">{errorMsg}</p>) : null}
            </form>
            {userSearchInput
                ? (<h3>{userResults.length
                    ? `Search results for "${userSearchInput}"`
                    : `No search results for "${userSearchInput}"`}</h3>)
                : null}
            <div>
                {loading && userSearchInput !== "" ? (
                    <p>Loading...</p>
                ) : (
                    <>
                    {userResults.length ? (
                        <>
                        {userResults.map((user) => {
                            return (
                                <div key={user._id} className="user-search-card">
                                    <Link to={`/profile/${user._id}`}>{user.username}</Link>
                                    <button
                                        type="button"
                                        className="add-remove"
                                        onClick={() => {
                                            // 'push' to membersToAdd to render it in MEMBERS list
                                            setMembersToAdd([...membersToAdd, user]);
                                            // safecopy search results, splice added member
                                            // ensures immediate removal of added member from search results
                                            let newResultsList = [...userResults];
                                            newResultsList.splice(newResultsList.indexOf(user), 1);
                                            setUserResults([...newResultsList]);
                                        }}
                                    >ADD</button>
                                </div>
                            )   
                        })}
                        </>
                    ) : null}
                    </>
                )}
            </div>
        </div>
    )
}

export default CreateBand;