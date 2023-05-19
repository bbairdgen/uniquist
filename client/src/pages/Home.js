import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MATCHUPS } from "../utils/queries";
import React, { useState } from "react";

// const styles = {
//   mainDivStyles: {
//     margin: "2% 8%",
//     padding: '20px 30px',
//     backgroundColor: '#A569BD',
//     color: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   formStyles: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '300px'
//   },
//   inputStyles: {
//     margin: '10px 0px',
//     border: 'none',
//     padding: '8px 8px',
//     borderRadius: '5px',
//     width: '80%'
//   },
//   imageStyle: {
//     width: '300px',
//     margin: '10px 0px',
//     border: '6px solid #A569BD'
//   }
// };

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage('No prompt entered');
      return;
    }

    // Create array with words in prompt

    const promptArray = prompt.split(' ');

    // Make API calls with words in array

    let bandNameArray = []

    for (let i = 0; i < promptArray.length; i++) {
      const word = promptArray[i].toLowerCase();

      const wordTypes = ["synonyms", "hypernyms", "hyponyms"];
      const currentWordType = wordTypes[Math.floor(Math.random() * 3)];

      const url = `https://languagetools.p.rapidapi.com/${currentWordType}/${word}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '2b2680de1emshab268001c35cf4ap1ccbf9jsn13714f7ac882',
          'X-RapidAPI-Host': 'languagetools.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        // console.log(response);
        // console.log(result);

        const currentWordArray = JSON.parse(result)

        if (currentWordArray.synonyms) {
          const currentWord = currentWordArray.synonyms[Math.floor(Math.random() * currentWordArray.synonyms.length)]
          bandNameArray.push(currentWord)
        } else if (currentWordArray.hypernyms) {
          const currentWord = currentWordArray.hypernyms[Math.floor(Math.random() * currentWordArray.hypernyms.length)]
          bandNameArray.push(currentWord)
        } else if (currentWordArray.hyponyms) {
          const currentWord = currentWordArray.hyponyms[Math.floor(Math.random() * currentWordArray.hyponyms.length)]
          bandNameArray.push(currentWord)
        }


        // Append random words to bandNameArray

      } catch (error) {
        console.error(error);
      }

      // Randomly select 1-3 words, return them

    }
    const bandName = bandNameArray[Math.floor(Math.random() * bandNameArray.length)]
    console.log(bandName)

    // Return result

    if (!prompt) {
      setErrorMessage("No name entered");
      return;
    }

    setPrompt("");
  };

  return (
    <div className="card bg-white card-rounded w-50">
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
            placeholder="prompt"
          />
          <button className="btn btn-lg btn-danger" onClick={handleFormSubmit}>Generate Name!</button>
          {/* </Link> */}
        </form>
        <h2 id='band-name'></h2>
      </div>
    </div>
  );
};

export default Home;
