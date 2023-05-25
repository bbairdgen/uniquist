const { AuthenticationError } = require("apollo-server-express");
const { User, Band } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require('bcrypt')

const resolvers = {
  Query: {
    users: async () => {
      return User.find({})
        .populate({
          path: "friends",
          populate: "username",
        })
        .populate({
          path: "bands",
          populate: ["bandname", "members"],
        });
    },
    user: async (parent, { _id }) => {
      const id = _id ? { _id } : {};
      return User.findById(id)
        .populate({
          path: "friends",
          populate: "username",
        })
        .populate({
          path: "bands",
          populate: ["bandname", "members"],
        });
    },
    bands: async () => {
      return Band.find({}).populate("members");
    },
    band: async (parent, { _id }) => {
      const id = _id ? { _id } : {};
      return Band.findById(id).populate("members");
    },
  },

  Mutation: {
    ///////////////////////////////////////////////////////////////////
    /////////////////////////// AUTH ROUTES ///////////////////////////
    ///////////////////////////////////////////////////////////////////

    login: async (parent, { username, password }, context) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect username");
      }
      const correctPw = await user.isCorrectPassword(password);
      // console.log(`---\n${password} (entered)\n${user.password} (correct)\ncorrectPw is ${correctPw}\n---`);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    createUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new Error("Failed to create user");
      }

      const token = signToken(user);
      return { token, user };
    },




    ///////////////////////////////////////////////////////////////////
    /////////////////////////// USER ROUTES ///////////////////////////
    ///////////////////////////////////////////////////////////////////


    updateUsername: async (parent, { username }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { username },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    updatePassword: async (parent, { password }, context) => {
      if (context.user) {
        console.log(context.user._id)
        // const user = await User.findOne({ _id: context.user._id });
        // const correctPw = await user.isCorrectPassword(oldPassword);
        // if (!correctPw) {
        //   throw new AuthenticationError("Incorrect password");
        // }
        const saltRounds = 10;
        let newPassword = await bcrypt.hash(password, saltRounds);

        return User.findByIdAndUpdate(
          context.user._id,
          { password: newPassword },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    addFriend: async (parent, { friendID }, context) => {
      if (context.user) {
        const friendExists = await User.exists({ _id: friendID });
        if (!friendExists) {
          throw new Error("No user found with that friendID");
        }

        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendID } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    removeFriend: async (parent, { friendID }, context) => {
      if (context.user) {
        const friendExists = await User.exists({ _id: friendID });
        if (!friendExists) {
          throw new Error("No user found with that friendID");
        }

        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendID } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    addFavorite: async (parent, { text }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: text } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    removeFavorite: async (parent, { text }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: text } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },


    //// NOAH'S NOTE 5/24/2023 9:15PM MDT
    //// The two resolvers below were proving problematic. You can't just
    //// add bands to any user without authentication. So until we can
    //// implement a "join band request" feature, the `Bands` field on the
    //// User model is effectively useless.
    //// So now, when rendering a user's profile, All Bands will be queried
    //// to find any that have the user, rather than querying the User and
    //// mapping through their `bands` field.


    // addBandToUsers: async (parent, { userIDs, bandID }, context) => {
    //   if (context.user) {
    //     const bandExists = await Band.exists({ _id: bandID });
    //     if (!bandExists) {
    //       throw new Error("No band found with that bandID");
    //     }

    //     userIDs.forEach((userID) => {
    //       return User.findOneAndUpdate(
    //         { _id: userID },
    //         { $addToSet: { bands: bandID } },
    //         { new: true }
    //       );
    //     });
    //   }

    //   throw new AuthenticationError("Authentication required");
    // },

    // removeBandFromUsers: async (parent, { userIDs, bandID }) => {
    //   if (context.user) {
    //     const bandExists = await Band.exists({ _id: bandID });
    //     if (!bandExists) {
    //       throw new Error("No band found with that bandID");
    //     }

    //     return User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { bands: bandID } },
    //       { new: true }
    //     );
    //   }

    //   throw new AuthenticationError("Authentication required");
    // },





    ///////////////////////////////////////////////////////////////////
    /////////////////////////// BAND ROUTES ///////////////////////////
    ///////////////////////////////////////////////////////////////////

    createBand: async (parent, args, context) => {
      if (context.user) {
        const band = await Band.create(args);
        if (!band) {
          throw new Error("Failed to create band");
        } else return band;
      }

      throw new AuthenticationError("Authentication required");
    },

    updateBandname: async (parent, { bandID, bandname }, context) => {
      if (context.user) {
        const bandExists = await Band.exists({ _id: bandID });
        if (!bandExists) {
          throw new Error("No band found with that bandID");
        }

        return Band.findOneAndUpdate(
          { _id: bandID },
          { bandname },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    addBandMember: async (parent, { bandID, userID }, context) => {
      if (context.user) {
        const bandExists = await Band.exists({ _id: bandID });
        if (!bandExists) {
          throw new Error("No band found with that bandID");
        }

        return Band.findOneAndUpdate(
          { _id: bandID },
          { $addToSet: { members: userID } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    removeBandMember: async (parent, { bandID, userID }, context) => {
      if (context.user) {
        const bandExists = await Band.exists({ _id: bandID });
        if (!bandExists) {
          throw new Error("No band found with that bandID");
        }
        return Band.findOneAndUpdate(
          { _id: bandID },
          { $pull: { members: userID } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    addStreamLink: async (parent, { bandID, streamLink }, context) => {
      if (context.user) {
        const bandExists = await Band.exists({ _id: bandID });
        if (!bandExists) {
          throw new Error("No band found with that bandID");
        }

        return Band.findOneAndUpdate(
          { _id: bandID },
          { $addToSet: { stream_links: streamLink } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },

    removeStreamLink: async (parent, { bandID, streamLink }, context) => {
      if (context.user) {
        const bandExists = await Band.exists({ _id: bandID });
        if (!bandExists) {
          throw new Error("No band found with that bandID");
        }

        return Band.findOneAndUpdate(
          { _id: bandID },
          { $pull: { stream_links: streamLink } },
          { new: true }
        );
      }

      throw new AuthenticationError("Authentication required");
    },
  },
};

module.exports = resolvers;
