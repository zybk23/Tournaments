import { gql } from "@apollo/client";

export const CREATE_TOURNAMENT_MUTATION = gql`
  mutation createTournament(
    $name: String!
    $id: String!
    $deadline: String!
    $waitlistParticipantsCount: Int!
    $owner: Tournament!
  ) {
    createTournament(
      name: $name
      id: $id
      deadline: $deadline
      waitlistParticipantsCount: $waitlistParticipantsCount
      owner: $owner
    )
  }
`;
