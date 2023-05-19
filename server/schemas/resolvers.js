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

    // AUTH ROUTES

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect username');
      }
      const correctPw = await user.isCorrectPassword(password);
console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },

    logout: async (parent, args, context) => {
      if (context.user) {
        try {
          await context.session.destroy();
        } catch (err) {
          console.error(err);
        }
      }
    },

    // USER ROUTES

    createUserAndLogIn: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new Error('Failed to create user');
      }

      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    updateUsername: async (parent, { username }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      return User.findByIdAndUpdate(
        context.user_id,
        { username },
        { new: true }
      );
    },

    updatePassword: async (parent, { oldPassword, newPassword }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const user = await User.findOne({ _id: context.user_id });
      const correctPw = await user.isCorrectPassword(oldPassword);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      return User.findByIdAndUpdate(
        context.user_id,
        { password: newPassword },
        { new: true }
      );
    },

    addFriend: async (parent, { friendID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const friendExists = await User.exists({ _id: friendID });
      if (!friendExists) {
        throw new Error('Friend does not exist');
      }

      const user = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $addToSet: { friends: friendID } },
        { new: true }
      );
      if (!user) {
        throw new Error('No user found with that ID');
      } else return user;
    },

    removeFriend: async (parent, { friendID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const friendExists = await User.exists({ _id: friendID });
      if (!friendExists) {
        throw new Error('No user found with that friendID');
      }

      const user = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $pull: { friends: friendID } },
        { new: true }
      );
      if (!user) {
        throw new Error('No user found with that ID');
      } else return user;
    },

    addFavorite: async (parent, { text }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $addToSet: { favorites: text } },
        { new: true }
      );
      if (!user) {
        throw new Error('No user found with that ID');
      } else return user;
    },

    removeFavorite: async (parent, { favoriteID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const favoriteExists = await User.exists({ _id: favoriteID });
      if (!favoriteExists) {
        throw new Error('User has no favorites with that ID');
      }

      const user = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $pull: { favorites: favoriteID } },
        { new: true }
      );
      if (!user) {
        throw new Error('No user found with that ID');
      } else return user;
    },

    addBandToUser: async (parent, { bandID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const user = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $addToSet: { bands: bandID } },
        { new: true }
      );
      return user;
    },

    removeBandFromUser: async (parent, { bandID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const user = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $pull: { bands: bandID } },
        { new: true }
      );
      return user;
    },

    // BAND ROUTES

    createBand: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const band = await Band.create(args);
      if (!band) {
        throw new Error('Failed to create band');
      } else return band;
    },

    updateBandName: async (parent, { bandID, bandname }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const updatedBand = await Band.findOneAndUpdate(
        { _id: bandID },
        { bandname },
        { new: true }
      );
    },

    addBandMember: async (parent, { bandID, userID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const band = await Band.findOneAndUpdate(
        { _id: bandID },
        { $addToSet: { members: userID } },
        { new: true }
      );
      return band;
    },

    removeBandMember: async (parent, { bandID, userID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const band = await Band.findOneAndUpdate(
        { _id: bandID },
        { $pull: { members: userID } },
        { new: true }
      );
      return band;
    },

    addStreamLink: async (parent, { bandID, streamLink }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const band = await Band.findOneAndUpdate(
        { _id: bandID },
        { $addToSet: { stream_links: streamLink } },
        { new: true }
      );
      return band;
    },

    removeStreamLink: async (parent, { bandID, streamLink }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const bandExists = await Band.exists({ _id: bandID });
      if (!bandExists) {
        throw new Error('No band found with that ID');
      }

      const band = await Band.findOneAndUpdate(
        { _id: bandID },
        { $pull: { stream_links: streamLink } },
        { new: true }
      );
      return band;
    }
  }
};

module.exports = resolvers;
