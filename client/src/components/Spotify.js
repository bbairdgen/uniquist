import "../css/spotify.css";
import { useState, useEffect } from "react";

const CLIENT_ID = "009b187e349649059f1e99553e63cc23";
const CLIENT_SECRET = "37d17a81bf0548a287403f1e9d3c8036";

function Spotify() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      //accesstoken
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    console.log("searching for " + searchInput);

    //Get request using search to get the Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("artist data");
        console.log(data);
        setArtistName(data.artists.items[0].name);
        console.log(artistName);

        return data.artists.items[0].id;
      });
    console.log("artist ID is " + artistID);

    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album,single&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });

    // Get request with Artist ID grab all the albums from that artist

    //Display those albums to the user
  }

  return (
    <div className="spotify-comp">
      <container>
        <input-group>
          <form className="search-form">
            <input
              placeholder="Search for Artist"
              type="text"
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  console.log("pressed enter");
                  search();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </form>
          <button className="search-button" onClick={search}>
            Search
          </button>
        </input-group>
      </container>
      <container className="spotify-data">
        <h3>Closest match on Spotify:</h3>
        <h2>{artistName}</h2>
        <section className="album-section">
          {albums.map((album, i) => {
            return (
              <div className="album-card">
                <img
                  className="album-image"
                  src={album.images[0].url}
                  alt="album cover"
                />
                <body>
                  <p>{album.name}</p>
                </body>
              </div>
            );
          })}
        </section>
      </container>
    </div>
  );
}

export default Spotify;
