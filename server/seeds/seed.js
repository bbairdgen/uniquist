const connection = require('../config/connection');
const { User, Band, Post } = require('../models');

// import data
const userData = require('./userData.json');
const bandData = require('./bandData.json');
const postData = require('./postData.json');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  // wipe db
  await User.deleteMany({});
  await Band.deleteMany({});
  await Post.deleteMany({});

  // Bulk creation from JSON data files.
  // Note: We can't create Posts here because of the
  // required field `createdBy`, which is of type ObjectID and must
  // be populated one user at a time.
  const users = await User.create(userData);
  const bands = await Band.create(bandData);

  const userIDs = users.map((user) => user._id);
  // console.log('userIDs:', userIDs); // debug

  for (let newUser of users) {
    // give user three random friends, cannot be themselves
    const friends = getRandomUsers(users, 3, newUser._id);
    friends.forEach((friend) => newUser.friends.push(friend));
    
    // add user to a random band document
    const tempBand = bands[Math.floor(Math.random() * bands.length)];
    tempBand.members.push(newUser._id);
    await tempBand.save();
    // now add that band to the user document
    newUser.bands.push(tempBand._id);

    // add 2 random posts to new user with 1 comment and reaction each
    // (and each comment will have 1 reaction and 1 reply)
    const postsToAdd = getRandomElements(postData, 2);
    for (let post in postsToAdd) {
      const newPost = await Post.create({
        createdBy: newUser._id,
        content: post,
        reactions: [
          {
            user_id: getRandomUsers(userIDs, 1, newUser._id),
            reactionType: getRandomElements(['like', 'dislike'], 1)
          }
        ],
        comments: [
          {
            user_id: getRandomUsers(userIDs, 1, newUser._id),
            content: getRandomElements(postData, 1),
            reactions: [
              {
                user_id: getRandomUsers(userIDs, 1, newUser._id),
                reactionType: getRandomElements(['like', 'dislike'], 1)
              }
            ],
            replies: [
              {
                user_id: getRandomUsers(userIDs, 1, newUser._id),
                content: getRandomElements(postData, 1),
                reactions: [
                  {
                    user_id: getRandomUsers(userIDs, 1, newUser._id),
                    reactionType: getRandomElements(['like', 'dislike'], 1)
                  }
                ]
              }
            ]
          }
        ]
      });

      newUser.posts.push(newPost);
    }

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
function getRandomUsers(arr, num, excludeID) {
  // this is the array we will return
  let friendsArray = [];

  // Safe copy of given array. At any point, represents the only elements
  // that the algorithm can push to friendsArray.
  let chooseables = [...arr];

  // exclude the excludeID from chooseable IDs
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

/**
 * Returns the specified number of random elements from the specified array.
 * @param {Array} arr The array from which to grab random elements.
 * @param {Number} num The number of random elements to grab.
 * @returns {Array} An array of random elements from the specified array.
 */
function getRandomElements(arr, num) {
  let elements = [];

  for (let i = 0; i < num; i++) {
    elements.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  // This function is versatile. Don't return an array if only one
  // random element was requested.
  if (num === 1) {
    return elements[0];
  }

  return elements;
}