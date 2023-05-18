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
    email: String!
    friends: [User]
    bands: [Band]
  }

  type Band {
    _id: ID!
    bandname: String!
    members: [User]
    stream_links: [String]
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    bands: [Band]
    band(_id: ID!): Band
  }

  type Mutation {
    createUser: User
    updateUser(email: String, password: String): User
    createBand(bandname: String!): Band
    updateBand(bandname: String): Band
    addFavorite(bandname: String!): User
    removeFavorite(bandname: String): User
  }
`;

module.exports = typeDefs;
