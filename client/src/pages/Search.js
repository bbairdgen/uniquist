import "../css/search.css";
import { useState, useEffect } from "react";
import SpotArtist from "../components/SpotArtist";
import DiscogsArtist from "../components/DiscogsArtist";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

// const DISCOGS_API_KEY = process.env.REACT_APP_DISCOGS_API_KEY;
// const DISCOGS_CLIENT_SECRET = process.env.REACT_APP_DISCOGS_CLIENT_SECRET;

// const CLIENT_ID = "f5de3e2e93b2497a99d948722d38f58f";
// const CLIENT_SECRET = "8a8d597f57214a25873bb057c7d41702";

const DISCOGS_API_KEY = "eKWMUYDhyHMLcJROWoyt";
const DISCOGS_CLIENT_SECRET = "tGPaeTNGkmkGDtRLWwVOopDwpSHseEgZ";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistResults, setArtistResults] = useState([]);
  const [discoReturns, setDiscoReturns] = useState([]);

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

  async function searchAll(e) {
    e.preventDefault();
    try {
      async function searchSpotify() {
        try {
          var searchParameters = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          };
          var artistFetch = await fetch(
            "https://api.spotify.com/v1/search?q=" +
              searchInput +
              "&limit=50&type=artist",
            searchParameters
          )
            .then((response) => response.json())
            .then((data) => {
              setArtistResults(data.artists.items);
              console.log(artistResults);

              return artistResults;
            });
        } catch (error) {
          console.log(error);
        }
      }

      async function searchDiscog() {
        try {
          await fetch(
            "https://api.discogs.com/database/search?q=" +
              searchInput +
              "&type=artist&key=" +
              DISCOGS_API_KEY +
              "&secret=" +
              DISCOGS_CLIENT_SECRET
          )
            .then((response) => response.json())
            .then((data) => {
              setDiscoReturns(data.results);
              console.log(discoReturns);
              return discoReturns;
            });
        } catch (error) {
          console.log(error);
        }
      }
      await searchSpotify();
      searchDiscog();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <p>Search a band name and see if it's already taken</p>
        <p>
          Currently, we will check for artists with the same name on Discogs and
          Spotify but we will be implementing a wider search soon.
        </p>

        <input-group>
          <form className="search-form" id="search-bar">
            <input
              placeholder="Search for Artist"
              type="text"
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button type="submit" className="search-button" onClick={searchAll}>
              Search
            </button>
          </form>
        </input-group>
      </div>
      <h4>GO TO</h4>

      <a className="nav-button" href="#disco-result-container">
        Discogs Results
      </a>
      <a className="nav-button" href="#spotty-result-container">
        Spotify Results
      </a>

      <div className="all-results-container">
        <div className="result-container" id="disco-result-container">
          <h2>Results from Discogs</h2>
          <section className="artists-section disco-artist-section">
            {discoReturns.map((discoArtist, i) => {
              console.log(discoArtist);
              var discoLink = "https://discogs.com" + discoArtist.uri;
              var coverImage = () => {
                if (discoArtist.cover_image.includes("spacer.gif")) {
                  return "https://pbs.twimg.com/media/CAtcT4NWgAAgUtA.jpg";
                } else {
                  return discoArtist.cover_image;
                }
              };

              return (
                <DiscogsArtist
                  key={discoArtist.id}
                  id={discoArtist.id}
                  name={discoArtist.title}
                  link={discoLink}
                  imageURL={coverImage()}
                />
              );
            })}
          </section>
        </div>
        <a className="nav-button" href="#search-bar">
          Back to top
        </a>
        <div className="result-container" id="spotty-result-container">
          <h2>Results from Spotify</h2>

          <section className="artists-section spotty-artist-section">
            {artistResults.map((spotArtist, i) => {
              var artistImage = () => {
                if (!spotArtist.images[0]?.url) {
                  return "https://pbs.twimg.com/media/CAtcT4NWgAAgUtA.jpg";
                } else {
                  return spotArtist.images[0].url;
                }
              };

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
        </div>
        <a className="nav-button" href="#search-bar">
          Back to top
        </a>
      </div>
    </div>
  );
}

export default Search;
