import AllUsers from "../pages/AllUsers";
import { REMOVE_FAVORITE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";

const BandNamesInfo = (props) => {
  const [faveInput, setFaveInput] = useState("");
  const [removeFavorite, { error }] = useMutation(REMOVE_FAVORITE);

  const handleDelete = async (e) => {
    console.log(e.target)
    let bandName = e.target.parentElement.getAttribute("bandname")
    try {
      await removeFavorite({
        variables: {
          userID: Auth.getProfile().data._id,
          text: bandName,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-info-card">
      <h4>{props.name}</h4>
      <section className="band-names">
        {props.bandNames.map((band, i) => {
          if (!null) {
            return (
              <div key={band} bandname={band}>
                <h5>{band}</h5>
                {/* {Auth.loggedIn() ? (
                  <button className="fave-button" onClick={handleDelete}>
                    Delete Band Name
                </button>
                  ) : (
                    <></>
                  )} */}
              </div>
            )
          } else {
            return <p>no band names</p>;
          }
        })}
      </section>
    </div>
  );
}

export default BandNamesInfo;
