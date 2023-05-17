import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import React, { useState } from 'react';

const styles = {
  mainDivStyles: {
    margin: "2% 8%",
    padding: '20px 30px',
    backgroundColor: '#A569BD',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px'
  },
  inputStyles: {
    margin: '10px 0px',
    border: 'none',
    padding: '8px 8px',
    borderRadius: '5px',
    width: '80%'
  },
  imageStyle: {
    width: '300px',
    margin: '10px 0px',
    border: '6px solid #A569BD'
  }
};

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });

  const matchupList = data?.matchups || [];

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'prompt') {
      setPrompt(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!prompt) {
      setErrorMessage('No prompt entered');
      return;
    }

    // Create array with words in prompt

    const promptArray = prompt.split(' ');

    // Make API calls with words in array

    const bandNameArray = []


    for (let i = 0; i < promptArray.length; i++) {
      const word = promptArray[i];

      // const request = require('request');
      // request.get({
      //   url: 'https://api.api-ninjas.com/v1/thesaurus?word=' + word,
      //   headers: {
      //     'X-Api-Key': '5Ayl23OqevNqajXiMG1rxQ==HM7LlqV7uVkR13kj'
      //   },
      // }, function (error, response, body) {
      //   if (error) return console.error('Request failed:', error);
      //   else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
      //   else console.log(body)
      // // Create a new array based on return from API, randomly select 1-3 words
      // const randSyn = Math.random() * body.synonyms.length;
      // bandNameArray.push(body.synonyms[randSyn])
      // });


      // $.ajax({
      //   method: 'GET',
      //   url: 'https://api.api-ninjas.com/v1/thesaurus?word=' + word,
      //   headers: { 'X-Api-Key': 'YOUR_API_KEY' },
      //   contentType: 'application/json',
      //   success: function (result) {
      //     console.log(result);
      //   },
      //   error: function ajaxError(jqXHR) {
      //     console.error('Error: ', jqXHR.responseText);
      //     // Create a new array based on return from API, randomly select 1-3 words
      //     // const randSyn = Math.random() * body.synonyms.length;
      //     // bandNameArray.push(body.synonyms[randSyn])
      //   }
      // });

      // Randomly select 1-3 words
      const bandName = bandNameArray[Math.random() * bandNameArray.length]

      console.log(bandName)

    }


    // Return result

    if (!prompt) {
      setErrorMessage('No name entered');
      return;
    }

    setPrompt('');
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
            style={styles.inputStyles}
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
