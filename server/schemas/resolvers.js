const { User, Band, favoriteSchema } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (parent, { _id }) => {
      const id = _id ? { _id } : {};
      return User.findById(id);
    },
    bands: async () => {
      return Band.find({});
    },
    band: async (parent, { _id }) => {
      const id = _id ? { _id } : {};
      return Band.findById(id);
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    updateUser: async (parent, args, context) => {
        if (context.user) {
          return User.findByIdAndUpdate(context.user.id, args, {
            new: true,
          });
        }
    }
  }
};

module.exports = resolvers;
