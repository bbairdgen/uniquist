const connection = require('../config/connection');
const { User, Band } = require('../models');

// import data
const userData = require('./userData.json');
const bandData = require('./bandData.json');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  // wipe db
  await User.deleteMany({});
  await Band.deleteMany({});

  // bulk creation from JSON data files
  const users = await User.create(userData);
  const bands = await Band.create(bandData);

  for (let newUser of users) {
    // give user three random friends, cannot be themselves
    const friends = randomFriends(users, 3, newUser._id);
    friends.forEach((friend) => newUser.friends.push(friend));
    
    // add user to a random band document
    const tempBand = bands[Math.floor(Math.random() * bands.length)];
    tempBand.members.push(newUser._id);
    await tempBand.save();
    // now add that band to the user document
    newUser.bands.push(tempBand._id);
    await newUser.save();
  }

  console.log("Done seeding database!");

  process.exit(0);
});


// I made the function below just to avoid cluttering up that `for` loop above

/**
 * Selects a number of random elements from a given array, ensuring there are no
 * duplicates in the returned array.
 * @param {Array} arr The array to pick random elements from.
 * @param {Number} num The number of elements to return.
 * @param {ObjectID} excludeID This ObjectID will not be present in the returned array.
 * @returns {Array} An array of elements randomly selected from `arr`.
 */
function randomFriends(arr, num, excludeID) {
  // this is the array we will return
  let friendsArray = [];

  // Safe copy of given array. At any point, represents the only elements
  // that the algorithm can push to friendsArray.
  let chooseables = [...arr];

  // exclude the excludeID
  // user IDs are always unique so `indexOf` is reliable
  chooseables.splice(chooseables.indexOf(excludeID), 1)

  for (let i = 0; i < num; i++) {
    // get random element from chooseable elements array
    randomEl = chooseables[Math.floor(Math.random() * chooseables.length)];
    // push this element to friendsArray
    friendsArray.push(randomEl);
    // exclude the random element from future runs
    chooseables.splice(chooseables.indexOf(randomEl), 1);
  }

  // uncomment this to manually check if duplicates exist
  // friendsArray.forEach((friend) => console.log("friend: ", friend._id))
  // console.log("\n")
  return friendsArray;
}