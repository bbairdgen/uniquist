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
    favorites: [Favorite]
    friends: [User]
    bands: [Band]
  }

  type Band {
    _id: ID!
    bandname: String!
    members: [User]
    stream_links: [String]
  }

  type Favorite {
    _id: ID!
    text: String!
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

  input UserInput {
    _id: ID!
  }

  input BandInput {
    _id: ID!
  }

  input StringInput {
    text: String!
  }

  type Mutation {
    createUser(username: String!, password: String!): Auth
    updateUser(_id: ID!, username: String, password: String, favorites: [StringInput], friends: [UserInput], bands: [BandInput]): User
    login(username: String!, password: String!): Auth
    createBand(bandname: String!, members: [UserInput], stream_links: [String]): Band
    updateBand(_id: ID!, bandname: String, members: [UserInput], stream_links: [StringInput]): Band
  }
`;

module.exports = typeDefs;
