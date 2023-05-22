const bandcamp = require("bandcamp-scraper");

function Bandcamp() {
  const params = {
    tag: "nuwrld",
    page: 1,
  };

  bandcamp.getAlbumsWithTag(params, function (error, tagResults) {
    if (error) {
      console.log(error);
    } else {
      console.log(tagResults);
    }
  });
  return <div>bandcamp search</div>;
}

export default Bandcamp;
