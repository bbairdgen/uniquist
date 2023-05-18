import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query AllUsers {
    users {
      _id
      username
      bands {
        _id
        bandname
        stream_links
      }
      dateJoined
      favorites {
        _id
        bandname
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ONE_USER = gql`
  query oneUser($id: ID!) {
    user(_id: $id) {
      _id
      bands {
        _id
        bandname
        stream_links
      }
      dateJoined
      favorites {
        _id
        bandname
      }
      friends {
        _id
        username
      }
      username
    }
  }
`;
