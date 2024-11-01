import { gql } from '@apollo/client';

export const EDIT_PROFILE_MUTATION = gql`
  mutation Update($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        name
        signUpDate
        id
        email
        commandId
      }
    }
  }
`;
