import { ADD_FAVORITE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import "../css/addFavorites.css";

const AddFavorite = () => {
  const [faveInput, setFaveInput] = useState("");
  //   const faveName = faveInput;
  const [addFavorite, { error }] = useMutation(ADD_FAVORITE);

  const handleAdd = async () => {
    try {
      await addFavorite({
        variables: {
          userID: Auth.getProfile().data._id,
          text: faveInput,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section>
        {Auth.loggedIn() ? (
          <div>
            <form className="fave-box">
              <input
                placeholder="Enter cool band name idea"
                type="text"
                onChange={(event) => setFaveInput(event.target.value)}
              />
            </form>

            <button className="btn fave-button" onClick={handleAdd}>
              Add Band Name
            </button>
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
