import { gql } from "@apollo/client";

// AUTH ROUTES

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
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

// USER ROUTES

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($userID: ID!, $username: String!) {
    updateUsername(userID: $userID, username: $username) {
      _id
      username
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword(
    $userID: ID!
    $password: String!
  ) {
    updatePassword(
      userID: $userID
      password: $password
    ) {
      _id
      password
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userID: ID!, $friendId: ID!) {
    addFriend(userID: $userID, friendID: $friendId) {
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
  mutation RemoveFriend($userID: ID!, $friendId: ID!) {
    removeFriend(userID: $userID, friendID: $friendId) {
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
  mutation AddFavorite($userID: ID!, $text: String!) {
    addFavorite(userID: $userID, text: $text) {
      _id
      username
      favorites
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($userID: ID!, $text: String!) {
    addFavorite(userID: $userID, text: $text) {
      _id
      username
      favorites
    }
  }
`;

export const ADD_BAND_TO_USER = gql`
  mutation AddBandToUser($userID: ID!, $bandId: ID!) {
    addBandToUser(userID: $userID, bandID: $bandId) {
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
  mutation RemoveBandFromUser($userID: ID!, $bandId: ID!) {
    removeBandFromUser(userID: $userID, bandID: $bandId) {
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
  mutation AddBandMember($bandId: ID!, $userID: ID!) {
    addBandMember(bandID: $bandId, userID: $userID) {
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
  mutation RemoveBandMember($bandId: ID!, $userID: ID!) {
    removeBandMember(bandID: $bandId, userID: $userID) {
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
