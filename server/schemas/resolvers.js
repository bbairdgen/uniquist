const { AuthenticationError } = require('apollo-server-express');
const { User, Band, favoriteSchema } = require('../models');
const { signToken } = require('../utils/auth');

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
      const token = signToken(user)
      return {token, user};
    },
    updateUser: async (parent, args, context) => {
        if (context.user) {
          return User.findByIdAndUpdate(
            context.user.id,
            args,
            { new: true }
          );
        }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('1. Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError('2. Incorrect credentials');
      }

      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    createBand: async (parent, args) => {
      const band = await Band.create(args);
      return band;
    },
    updateBand: async (parent, args) => {
      const band = await Band.findOneAndUpdate(
        { bandname }, // filter: find by bandname
        { args }, // update: apply updated info
        { new: true }
      );
    },
    addFavorite: async (parent, { bandname }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user.id,
          { $addToSet: { favorites: bandname } },
          { new: true }
        )
      }
    },
    removeFavorite: async (parent, { bandname }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user.id,
          { $pull: { favorites: bandname } },
          { new: true }
        )
      }
    }
  }
};

module.exports = resolvers;
