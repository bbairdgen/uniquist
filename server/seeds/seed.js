const db = require('../config/connection');
const { User, Band } = require('../models');

const userData = require('./userData.json');
const bandData = require('./bandData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Band.deleteMany({});

  const users = await User.insertMany(userData);
  const bands = await Band.insertMany(bandData);

  console.log('Users and bands seeded!');
  process.exit(0);
});
