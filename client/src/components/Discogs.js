import { useState } from "react";
import DiscogsArtist from "./DiscogsArtist";

const discogsKey = "eKWMUYDhyHMLcJROWoyt";
const discogsSecret = "tGPaeTNGkmkGDtRLWwVOopDwpSHseEgZ";

function Discogs() {
  const [discoSearchInput, setDiscoSearchInput] = useState("");
  const [discoReturns, setDiscoReturns] = useState([]);
  const [hideReturns, setHideReturns] = useState(false);
  async function searchName(e) {
    e.preventDefault();
    try {
      await fetch(
        "https://api.discogs.com/database/search?q=" +
          discoSearchInput +
          "&type=artist&key=" +
          discogsKey +
          "&secret=" +
          discogsSecret
      )
        .then((response) => response.json())
        .then((data) => {
          setDiscoReturns(data.results);
          console.log(discoReturns);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>
        <input-group>
          <form className="search-form">
            <input
              placeholder="Search for Artist"
              type="text"
              onChange={(event) => setDiscoSearchInput(event.target.value)}
            />
            <button
              type="submit"
              className="search-button"
              onClick={searchName}
            >
              Search Discogs
            </button>
          </form>
        </input-group>
        <div>
          <section className="artists-section">
            {discoReturns.map((discoArtist, i) => {
              var discoLink = "https://discogs.com" + discoArtist.uri;
              var coverImage = () => {
                if (
                  discoArtist.cover_image ===
                  "https://st.discogs.com/8424523600871c268a39a3a33554c4bf8d711a7a/images/spacer.gif"
                ) {
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
      </div>
    </div>
  );
}

export default Discogs;
