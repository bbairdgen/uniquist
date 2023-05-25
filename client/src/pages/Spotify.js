import { Await } from "react-router-dom";
import "../css/spotify.css";
import { useState, useEffect } from "react";
import SpotArtist from "../components/SpotArtist";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FAVORITE } from "../utils/mutations";
import "dotenv/config"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

function Spotify() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [returnedArtists, setReturnedArtists] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [artistID, setArtistID] = useState("");

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
    try {
      console.log("searching for " + searchInput);

      //Get request using search to get the Artist ID
      var searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      var artistFetch = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
        searchParameters
      )
        .then((response) => response.json())

        .then((data) => {
          console.log("artist data");
          console.log(data);
          // console.log(data.artists);

          function collectNames() {
            var theNames = [];
            for (let i = 0; i < data.artists.items.length; i++) {
              const nm = data.artists.items[i].name;
              theNames.push(nm);
            }
            console.log(theNames);
            setReturnedArtists(theNames);
            return theNames;
          }

          collectNames();

          setArtistResults(data.artists.items);
          console.log("artist results");
          console.log(artistResults);
          // return data.artists.items;

          setArtistName(data.artists.items[0].name);
          console.log(artistName);

          // setArtistID(data.artists.items[0].id);

          return data.artists.items[0].id;
        });
    } catch (error) {
      console.log(error);
    }

    // Get request with Artist ID grab all the albums from that artist

    //Display those albums to the user
  }

  const returnedAlbums = async function (aId) {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        aId +
        "/albums" +
        "?include_groups=album,single&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("albums data dot items");
        console.log(data.items);
        setAlbums(data.items);
      });
  };

  return (
    <div className="spotify-comp">
      <div>
        <input-group>
          <form className="search-form">
            <input
              placeholder="Search for Artist"
              type="text"
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </form>
          <button className="search-button" onClick={search}>
            Search
          </button>
        </input-group>
      </div>
      <div>
        <h3>{searchInput}</h3>
      </div>
      <div className="spotify-data">
        <h3>Close matches on Spotify:</h3>
        <section className="artists-section">
          {artistResults.map((spotArtist, i) => {
            var artistImage = () => {
              if (!spotArtist.images[0]?.url) {
                return "https://pbs.twimg.com/media/CAtcT4NWgAAgUtA.jpg";
              } else {
                return spotArtist.images[0].url;
              }
            };
            console.log("artist image");
            console.log(artistImage());
            return (
              <SpotArtist
                key={spotArtist.id}
                id={spotArtist.id}
                name={spotArtist.name}
                externalUrl={spotArtist.external_urls.spotify}
                imageURL={artistImage()}
                genres={spotArtist.genres}
              ></SpotArtist>
            );
          })}
        </section>

        {/* <button
          className="albsearch-button"
          onClick={returnedAlbums("79es50rjZ8DktsXcyeT592")}
        >
          see albums
        </button> */}
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
      </div>
    </div>
  );
}

export default Spotify;
