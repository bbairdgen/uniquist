import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import React, { useState } from "react";
import AddFavorite from '../components/AddFavorite';
import "../css/home.css";
// import { rapidApiKey, randomApiKey } from '/utils/keys'
// require('dotenv').config()

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bandNameHeader, setBandNameHeader] = useState("");

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "prompt") {
      setPrompt(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!prompt) {
      setErrorMessage("No prompt entered");
      setBandNameHeader("No prompt entered");
      return;
    }

    // Create array with words in prompt

    const promptArray = prompt.split(" ");

    // Make API calls with words in array

    let bandNameArray = [];

    for (let i = 0; i < promptArray.length; i++) {
      const word = promptArray[i].toLowerCase();

      const wordTypes = ["synonyms", "hypernyms", "hyponyms"];
      const currentWordType = wordTypes[Math.floor(Math.random() * 3)];

      const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY
      const url = `https://languagetools.p.rapidapi.com/${currentWordType}/${word}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            rapidApiKey,
          "X-RapidAPI-Host": "languagetools.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        // console.log(response);
        // console.log(result);

        const currentWordArray = JSON.parse(result);

        if (currentWordArray.synonyms) {
          const currentWord =
            currentWordArray.synonyms[
            Math.floor(Math.random() * currentWordArray.synonyms.length)
            ];
          bandNameArray.push(currentWord);
        } else if (currentWordArray.hypernyms) {
          const currentWord =
            currentWordArray.hypernyms[
            Math.floor(Math.random() * currentWordArray.hypernyms.length)
            ];
          bandNameArray.push(currentWord);
        } else if (currentWordArray.hyponyms) {
          const currentWord =
            currentWordArray.hyponyms[
            Math.floor(Math.random() * currentWordArray.hyponyms.length)
            ];
          bandNameArray.push(currentWord);
        }

        // Append random words to bandNameArray
      } catch (error) {
        console.error(error);
      }

      // Randomly select 1-3 words, return them
    }
    let bandName =
      bandNameArray[Math.floor(Math.random() * bandNameArray.length)];

    // Randomly add an extra word
    const randChance = Math.floor(Math.random() * 10);

    if (randChance > 5) {
      const url = 'https://random-words5.p.rapidapi.com/getMultipleRandom?count=1';
      const randomApiKey = process.env.REACT_APP_RANDOM_API_KEY
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': randomApiKey,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const randWordResult = JSON.parse(result);
        console.log(randWordResult[0]);

        bandName = bandName + " " + randWordResult[0]
      } catch (error) {
        console.error(error);
      }
    }

    bandName ? setBandNameHeader(bandName) : setBandNameHeader("Prompt not descriptive enough");
    // console.log(bandName)

    setPrompt("");
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <AddFavorite />
      {/* <div className="card-header bg-dark text-center">
        <h1>Band Name Generator</h1>
      </div>
      <div className="card-body m-5">
        <h2>Here is a list of matchups you can vote on:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {matchupList.map((matchup) => {
              return (
                <li key={matchup._id}>
                  <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                    {matchup.tech1} vs. {matchup.tech2}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div> */}
      <div className="card-footer text-center">
        <h2>Band Name Generator</h2>
        <form>
          {/* <Link to="/matchup"> */}
          <input
            // style={styles.inputStyles}
            value={[prompt]}
            name="prompt"
            onChange={handleInputChange}
            type="prompt"
            placeholder="Prompt (genre, style, etc.)"
          />
          <button className="btn btn-lg btn-danger" onClick={handleFormSubmit}>
            Generate Name!
          </button>
          {/* </Link> */}
        </form>
        <h2 id="band-name">{bandNameHeader}</h2>
      </div>
    </div>
  );
};

export default Home;
