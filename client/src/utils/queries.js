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
        members {
          _id
          username
        }
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
        members {
          _id
          username
        }
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
  query OneBand($id: ID!) {
    band(_id: $id) {
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