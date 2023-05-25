import "../css/bandpage.css";

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ONE_BAND } from "../utils/queries";
import { Link } from "react-router-dom";

const BandPage = () => {
  const { bandID } = useParams();
  // console.log(`bandID (${typeof bandID})`, bandID);

  const band = useQuery(QUERY_ONE_BAND, {
    variables: { bandID },
  });

  return (
    <div>
      <h2>{band.data?.band.bandname}</h2>
      <h3>Members</h3>
      <div className="band-members">
        {band.data?.band.members.map((member) => {
          return (
            <div key={member._id} className="bandmember-card">
              <Link to={`/profile/${member._id}`}>{member.username}</Link>
            </div>
          );
        })}
      </div>

      <div className="stream-links">
        <div className="links-container">
          <h3>Links</h3>
          {band.data?.band.stream_links.map((link) => {
            return (
              <div key={link._id} className="link-card">
                <a
                  className="stream-link"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link}
                </a>
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
};

export default BandPage;
