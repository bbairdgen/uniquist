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
 * Selects a number of random elements from a given array
 * @param {Array} arr The array to pick random elements from
 * @param {Number} num The number of elements to return
 * @param {ObjectID} excludeID This ObjectID will not be present in the returned array.
 * @returns {Array} One element from the array, or an array of random elements.
 */
function randomFriends(arr, num, excludeID) {
  let friendsArray = [];

  // `While` loop ensures we get `num` elements pushed to friendsArray
  // AND that excludeID is still excluded
  while (friendsArray.length < num) {
    randomEl = arr[Math.floor(Math.random() * arr.length)];
    if (randomEl._id !== excludeID) {
      friendsArray.push(randomEl);
    } else continue
  }

  // check for duplicate friends in the array
  // FIXME: This isn't done. In the app's current state, this seed script
  // has a chance of adding duplicate friends to a user. Not urgent.
  const containsDuplicates = friendsArray.some((element, index) => {
    return friendsArray.indexOf(element) !== index;
  });

  return friendsArray;
}