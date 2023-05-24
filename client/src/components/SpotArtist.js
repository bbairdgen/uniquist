import { redirect } from "react-router-dom";
import "../css/spotArtist.css";

function SpotArtist(props) {
  return (
    <div className="spotify-artist-card">
      <h4 className="artist-title">{props.name}</h4>
      <a
        className="spotty-link"
        href={props.externalUrl}
        target="_blank"
        rel="noreferrer"
      >
        visit on spotify
      </a>
      <div className="img-box">
        <img
          className="artist-image"
          src={props.imageURL}
          alt="artist"
          {...props.name}
        />
      </div>
    </div>
  );
}

export default SpotArtist;
