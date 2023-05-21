import { gql } from "@apollo/client";

// AUTH ROUTES

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout($userId: ID!) {
    logout(userID: $userId) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// NOAH'S NOTE 5/19 4:42PM: I'm still not sure I understand the syntax
// of mutations, so I'm putting these here because I think they should
// work, but there's no way to test them on the frontend yet, so I wasn't
// able to test them on my computer (because they all require user
// authentication which I don't know how to test on the backend).
// Once the front end starts using these mutations, we'll be able to bug test.

// USER ROUTES

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($userId: ID!, $username: String!) {
    updateUsername(userID: $userId, username: $username) {
      _id
      username
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword(
    $userId: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      userID: $userId
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      _id
      password
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: ID!, $friendId: ID!) {
    addFriend(userID: $userId, friendID: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!, $friendId: ID!) {
    removeFriend(userID: $userId, friendID: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($userId: ID!, $text: String!) {
    addFavorite(userID: $userId, text: $text) {
      _id
      username
      favorites
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($userId: ID!, $favoriteId: ID!) {
    removeFavorite(userID: $userId, favoriteID: $favoriteId) {
      _id
      username
      favorites
    }
  }
`;

export const ADD_BAND_TO_USER = gql`
  mutation AddBandToUser($userId: ID!, $bandId: ID!) {
    addBandToUser(userID: $userId, bandID: $bandId) {
      _id
      username
      bands {
        _id
        bandname
      }
    }
  }
`;

export const REMOVE_BAND_FROM_USER = gql`
  mutation RemoveBandFromUser($userId: ID!, $bandId: ID!) {
    removeBandFromUser(userID: $userId, bandID: $bandId) {
      _id
      username
      bands {
        bandname
        members {
          _id
          username
        }
      }
    }
  }
`;

// BAND ROUTES

export const CREATE_BAND = gql`
  mutation CreateBand(
    $bandname: String!
    $members: [ID]
    $streamLinks: [String]
  ) {
    createBand(
      bandname: $bandname
      members: $members
      stream_links: $streamLinks
    ) {
      _id
      bandname
      members {
        _id
        username
      }
      stream_links
    }
  }
`;

export const UPDATE_BANDNAME = gql`
  mutation UpdateBandName($bandId: ID!, $bandname: String) {
    updateBandName(bandID: $bandId, bandname: $bandname) {
      _id
      bandname
      members {
        _id
        username
      }
      stream_links
    }
  }
`;

export const ADD_BAND_MEMBER = gql`
  mutation AddBandMember($bandId: ID!, $userId: ID!) {
    addBandMember(bandID: $bandId, userID: $userId) {
      _id
      bandname
      members {
        _id
        username
      }
      stream_links
    }
  }
`;

export const REMOVE_BAND_MEMBER = gql`
  mutation RemoveBandMember($bandId: ID!, $userId: ID!) {
    removeBandMember(bandID: $bandId, userID: $userId) {
      _id
      bandname
      members {
        _id
        username
      }
      stream_links
    }
  }
`;

export const ADD_STREAM_LINK = gql`
  mutation AddStreamLink($bandId: ID!, $streamLink: String!) {
    addStreamLink(bandID: $bandId, streamLink: $streamLink) {
      _id
      bandname
      stream_links
    }
  }
`;

export const REMOVE_STREAM_LINK = gql`
  mutation RemoveStreamLink($bandId: ID!, $streamLink: String!) {
    removeStreamLink(bandID: $bandId, streamLink: $streamLink) {
      _id
      bandname
      stream_links
    }
  }
`;
