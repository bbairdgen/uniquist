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

  type Post {
    _id: ID!
    createdBy: User
    content: String
    media: [Media]
    band: Band
    dateCreated: String
    reactions: [Reaction]
    comments: [Comment]
  }

  type Media {
    mediaType: String
    url: String
  }

  type Comment {
    _id: ID!
    user: User
    content: String
    dateCreated: String
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID!
    user: User
    reactionType: String
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
    createUser(username: String!, password: String!): Auth

    # USER ROUTES
    updateUsername(userID: ID!, username: String!): User
    updatePassword(userID: ID!, password: String!): User
    addFriend(userID: ID!, friendID: ID!): User
    removeFriend(userID: ID!, friendID: ID!): User
    addFavorite(userID: ID!, text: String!): User
    removeFavorite(userID: ID!, text: String!): User
    # The 2 routes below have auth issues and are deprecated for now
    # The auth issues will be resolved by implementing a 'request'
    # addBandToUser(userID: ID!, bandID: ID!): User
    # removeBandFromUser(userID: ID!, bandID: ID!): User

    # BAND ROUTES
    createBand(bandname: String!, members: [ID], stream_links: [String]): Band
    updateBandname(bandID: ID!, bandname: String): Band
    addBandMember(bandID: ID!, userID: ID!): Band
    removeBandMember(bandID: ID!, userID: ID!): Band
    addStreamLink(bandID: ID!, streamLink: String!): Band
    removeStreamLink(bandID: ID!, streamLink: String!): Band

    # ROUTES FOR POSTS
    # createPost()
  }
`;

module.exports = typeDefs;
