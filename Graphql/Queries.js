import { gql } from "@apollo/client";

export const GET_ALL_TOURNAMENTS = gql`
  query getAllTournaments {
    listedTournaments {
      id
      name
      deadline
      waitlistParticipantsCount
      owner {
        id
        username
        avatar
      }
    }
  }
`;
export const GET_LIMITTED_TOURNAMENTS = gql`
  query getAllTournaments($count: Int!, $offset: Int!) {
    listedTournaments(count: $count, offset: $offset) {
      id
      name
      deadline
      waitlistParticipantsCount
      owner {
        id
        username
        avatar
      }
    }
  }
`;
