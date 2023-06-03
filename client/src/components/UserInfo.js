import React from "react";
import '../css/allUsers.css';
import { Link } from 'react-router-dom';

function UserInfo(props) {
  return (
    <div className="user-info-card">
      <Link to={`/profile/${props.id}`}>{props.name}</Link>
      <h3>Saved band names</h3>
      <section className="band-names">
        {props.bandNames.length ? (
          <>
          {props.bandNames.map((band) => {
            if (!null) {
              return <h5 key={band}>{band}</h5>;
            } else {
              return <p>no band names</p>;
            }
          })}
          </>
        ) : (
          <p>(no saved names yet)</p>
        )}
        
      </section>
    </div>
  );
}

export default UserInfo;
