import { ADD_FAVORITE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";

const AddFavorite = () => {
  const [faveInput, setFaveInput] = useState("");
  //   const faveName = faveInput;
  const [addFavorite, { error }] = useMutation(ADD_FAVORITE);

  const handleAdd = async () => {
    try {
      console.log("variables to pass");
      console.log("Auth.getProfile().data._id:", Auth.getProfile().data._id);
      console.log("faveInput:", faveInput);
      await addFavorite({
        variables: {
          userID: Auth.getProfile().data._id,
          text: faveInput
        }
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
                placeholder="add band name"
                type="text"
                onChange={(event) => setFaveInput(event.target.value)}
              />
            </form>

            <button className="fave-button" onClick={handleAdd}>
              add band name
            </button>
          </div>
        ) : (
          <div>
            <p>auth error</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AddFavorite;