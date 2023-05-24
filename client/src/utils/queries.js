import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query AllUsers {
    users {
      _id
      username
      dateJoined
      favorites
      friends {
        _id
        username
      }
      bands {
        _id
        bandname
        members {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_ONE_USER = gql`
  query oneUser($userID: ID!) {
    user(_id: $userID) {
      _id
      username
      dateJoined
      favorites
      friends {
        _id
        username
      }
      bands {
        _id
        bandname
        members {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_ALL_BANDS = gql`
  query AllBands {
    bands {
      _id
      bandname
      stream_links
      members {
        _id
        username
      }
    }
  }
`;

export const QUERY_ONE_BAND = gql`
  query OneBand($bandID: ID!) {
    band(_id: $bandID) {
      _id
      bandname
      stream_links
      members {
        _id
        username
      }
    }
  }
`;
