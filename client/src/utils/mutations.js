import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(email: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $username: String, $password: String, $favorites: [StringInput], $friends: [UserInput], $bands: [BandInput]) {
    updateUser(_id: $_id, username: $username, password: $password, favorites: $favorites, friends: $friends, bands: $bands) {
      username
      password
      favorites {
        text
      }
      friends {
        _id
      }
      bands {
        _id
      }
    }
  }
`;

export const CREATE_BAND = gql`
  mutation CreateBand($bandname: String!, $members: [UserInput]) {
    createBand(bandname: $bandname, members: $members, stream_links: $stream_links) {
      bandname
      stream_links
      members {
        _id
      }
    }
  }
`;

export const UPDATE_BAND = gql`
  mutation updateBand($_id: ID!, $bandname: String, $members: [UserInput], $stream_links: [LinksInput]) {
    updateBand(_id: $_id, bandname: $bandname, members: $members, stream_links: $stream_links) {
      bandname
      members {
        _id
      }
      stream_links
    }
  }
`;