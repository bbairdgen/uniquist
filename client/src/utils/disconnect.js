// Consumer Key	eKWMUYDhyHMLcJROWoyt
// Consumer Secret	tGPaeTNGkmkGDtRLWwVOopDwpSHseEgZ
// Request Token URL	https://api.discogs.com/oauth/request_token
// Authorize URL	https://www.discogs.com/oauth/authorize
// Access Token URL	https://api.discogs.com/oauth/access_token

var Discogs = require("disconnect").Client;



// const discogsKey = process.env.REACT_APP_DISCOGS_API_KEY;
// const discogsSecret = process.env.REACT_APP_DISCOGS_CLIENT_SECRET;
const discogsKey = "eKWMUYDhyHMLcJROWoyt";
const discogsSecret = "tGPaeTNGkmkGDtRLWwVOopDwpSHseEgZ";

function searchName() {
  fetch(
    "https://api.discogs.com/database/search?q=Nirvana&key=" +
      discogsKey +
      "&secret=" +
      discogsSecret
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

searchName();

// var db = new Discogs().database();
// db.getRelease(176126, function (err, data) {
//   console.log(data);
// });

// var col = new Discogs().user().collection();
// col.getReleases(
//   "USER_NAME",
//   0,
//   { page: 2, per_page: 75 },
//   function (err, data) {
//     console.log(data);
//   }
// );
