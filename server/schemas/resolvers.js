const { User, Band, favoriteSchema } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({})
        .populate({
          path: 'friends',
          populate: 'username'
        })
        .populate({
          path: 'bands',
          populate: ['bandname', 'members']
        });
    },
    user: async (parent, { _id }) => {
      const id = _id ? { _id } : {};
      return User.findById(id)
        .populate({
          path: 'friends',
          populate: 'username'
        })
        .populate({
          path: 'bands',
          populate: ['bandname', 'members']
        });
    },
    bands: async () => {
      return Band.find({})
        .populate('members');
    },
    band: async (parent, { _id }) => {
      const id = _id ? { _id } : {};
      return Band.findById(id)
        .populate('members');
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    updateUser: async (parent, { _id, username, password, favorites, friends, bands }, context) => {
        // if (context.user) {
          return User.findByIdAndUpdate(
            /*context.user_id,*/ _id,
            { username, password, favorites, friends, bands },
            { new: true }
          );
        // }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    createBand: async (parent, args) => {
      const band = await Band.create(args);
      return band;
    },
    updateBand: async (parent, { _id, bandname, stream_links }) => {
      const updatedBand = await Band.findByIdAndUpdate(
        _id, // filter: find by bandname
        { bandname, stream_links }, // replaces old data with variables
        { new: true }
      );
    }
  }
};

module.exports = resolvers;
