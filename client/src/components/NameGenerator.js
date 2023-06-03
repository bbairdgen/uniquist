import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import AddFavorite from '../components/AddFavorite';
import "../css/home.css";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE } from "../utils/mutations";
// import { rapidApiKey, randomApiKey } from '/utils/keys'
// require('dotenv').config()

import Auth from '../utils/auth';

const NameGenerator = () => {

  let __USERID = "";
  if (Auth.loggedIn()) {
    __USERID = Auth.getProfile().data._id;
  }

  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bandNameHeader, setBandNameHeader] = useState("");
  const [viewAllSavedHeader, setViewAllSavedHeader] = useState("");

  
  const [successMsg, setSuccessMsg] = useState("");
  const [addFavorite] = useMutation(ADD_FAVORITE);

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

    const promptArray = prompt.trim().toLowerCase().split(" ");

    // Make API calls with words in array

    let bandNameArray = [];

    for (let i = 0; i < promptArray.length; i++) {
      const word = promptArray[i];

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



  const handleSaveName = (e) => {
    e.preventDefault();

    try {
      // prevent submission if text box is empty
      if (bandNameHeader) {
        // console.log("bandNameHeader:", bandNameHeader); // debug
        // initiate mutation
        addFavorite({
          variables: {
            userID: __USERID,
            text: bandNameHeader,
          },
          onCompleted: () => {
            e.target.classList.toggle("btn-favorited");
            e.target.textContent = "Favorited!";
            setViewAllSavedHeader("view all saved names")
          }
        });
      } // no else; text box being empty is error-handled elsewhere
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="name-generator">
      <h2>Band Name Generator</h2>
      <form>
        <input
          value={[prompt]}
          name="prompt"
          onChange={handleInputChange}
          type="prompt"
          placeholder="Prompt (genre, style, etc.)"
        />
        <button className="btn btn-lg btn-danger" onClick={handleFormSubmit}>
          Generate Name!
        </button>
      </form>
      <h2 id="band-name">{bandNameHeader}</h2>
      {Auth.loggedIn()
        && bandNameHeader
        && bandNameHeader !== "Prompt not descriptive enough"
        && bandNameHeader !== "No prompt entered"
        ? (
          <>
          <button
            id="fave-btn"
            type="button"
            className="btn"
            onClick={handleSaveName}
          >♥ Favorite</button>
          {viewAllSavedHeader ? (
            <HashLink to={`/profile/${__USERID}#saved-names`} id="view-all-saved">{viewAllSavedHeader}</HashLink>
          ) : null}
          </>
      ) : (
        <>
        {errorMessage}
        </>
      )}
    </div>
  );
};

export default NameGenerator;
