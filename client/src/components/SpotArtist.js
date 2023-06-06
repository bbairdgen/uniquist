import "../css/spotArtist.css";

function SpotArtist(props) {
  return (
    <div className="spotify-artist-card">
      <a
        className="spotty-link"
        href={props.externalUrl}
        target="_blank"
        rel="noreferrer"
      >
        {props.name}
      </a>
      <ul className="genre-list">
        {props.genres.map((genre, i) => {
          if (!genre) {
            return <li>no genre</li>;
          } else return <li>{genre}</li>;
        })}
      </ul>
      <div className="img-box">
        <img className="artist-image" src={props.imageURL} alt="artist" />
      </div>
    </div>
  );
}

export default SpotArtist;
