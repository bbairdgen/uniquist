import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createMatchup($username: String!, $password: String!) {
    createUser(username: $username! password: String!) {
      _id
      tech1
      tech2
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;
