import "../css/addFavorites.css";
import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE } from "../utils/mutations";

import Auth from "../utils/auth";

const AddFavorite = () => {
  const [faveInput, setFaveInput] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [addFavorite, { error }] = useMutation(ADD_FAVORITE);

  let __USERID = "";
  if (Auth.loggedIn()) {
    __USERID = Auth.getProfile().data._id
  }

  const handleAdd = (e) => {
    e.preventDefault();

    try {
      // prevent submission if text box is empty
      if (faveInput) {
        setErrorMsg("");
        addFavorite({
          variables: {
            userID: __USERID,
            text: faveInput,
          },
          onCompleted: () => {
            setSuccessMsg(`${faveInput} added to saved band names •`);
          }
        });
      } else {
        setErrorMsg("Band name field required");
      }

      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-favorite">
      <section>
        {Auth.loggedIn() ? (
          <div>
            <form className="fave-box">
              <input
                required
                placeholder="Enter cool band name idea"
                type="text"
                onChange={(event) => setFaveInput(event.target.value)}
              />
              <button type="submit" className="btn fave-button" onClick={handleAdd}>
                Add Band Name
              </button>
            </form>

            {successMsg
              ? (
                  <p>
                    {successMsg}
                    <HashLink to={`/profile/${__USERID}#saved-names`} style={{display: 'inline'}}>view all</HashLink>
                  </p>
                )
              : null}
            <div className="error-msg">{errorMsg}</div>
          </div>
        ) : (
          <></>
          // <div>
          //   <p className="storeBand">Log in to store band names</p>
          // </div>
        )}
      </section>
    </div>
  );
};

export default AddFavorite;
