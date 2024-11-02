import { gql } from '@apollo/client';

export const ADD_CATEGORY_MUTATION = gql`
  mutation Add($input: CategoryAddInput!) {
    categories {
      add(input: $input) {
        id
        name
        photo
        createdAt
        updatedAt
        commandId
      }
    }
  }
`;
