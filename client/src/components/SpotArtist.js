import "../css/spotArtist.css";

function SpotArtist(props) {
  return (
    <section className="spotify-artist-card">
      <h4>{props.name}</h4>
      <h4>{props.id}</h4>
      <h4>{props.externalUrl}</h4>
    </section>
  );
}

export default SpotArtist;
