const { gql } = require("apollo-server-express");

//to add under User:
// dateJoined: Date!
// favorites: [Favorite]

//to add under mutation:
// createUser(username: String!, email: String!, password: String!): Auth
// login(username: String!, password: String!): Auth

//removed members from  createBand(bandname: String!, members: [Input]): Band

//removed members from  updateBand(bandname: String, members: [User]): Band

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    dateJoined: String!
    favorites: [String]
    friends: [User]
    bands: [Band]
  }

  type Band {
    _id: ID!
    bandname: String!
    members: [User]
    stream_links: [String]
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    users: [User]
    user(_id: ID!): User
    bands: [Band]
    band(_id: ID!): Band
  }


  type Mutation {

    # AUTH ROUTES
      login(username: String!, password: String!): Auth
      logout(userID: ID!): Auth

    # USER ROUTES
      createUserAndLogIn(username: String!, password: String!): Auth
      updateUsername(userID: ID!, username: String!): User
      updatePassword(userID: ID!, oldPassword: String!, newPassword: String!): User
      addFriend(userID: ID!, friendID: ID!): User
      removeFriend(userID: ID!, friendID: ID!): User
      addFavorite(userID: ID!, favorite: String!): User
      removeFavorite(userID: ID!, favorite: String!): User
      addBandToUser(userID: ID!, bandID: ID!): User
      removeBandFromUser(userID: ID!, bandID: ID!): User

    # BAND ROUTES
      createBand(bandname: String!, members: [ID], stream_links: [String]): Band
      updateBandname(bandID: ID!, bandname: String): Band
      addBandMember(bandID: ID!, userID: ID!): Band
      removeBandMember(bandID: ID!, userID: ID!): Band
      addStreamLink(bandID: ID!, streamLink: String!): Band
      removeStreamLink(bandID: ID!, streamLink: String!): Band
  }
`;

module.exports = typeDefs;
