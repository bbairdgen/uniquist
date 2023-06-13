function DiscogsArtist(props) {
  return (
    <div className="spotify-artist-card">
      <a
        className="spotty-link"
        href={props.link}
        target="_blank"
        rel="noreferrer"
      >
        {props.name}
      </a>
      <div className="img-box">
        <img className="artist-image" src={props.imageURL} alt="artist"></img>
      </div>
    </div>
  );
}

export default DiscogsArtist;
