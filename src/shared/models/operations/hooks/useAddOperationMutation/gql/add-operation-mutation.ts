import { gql } from '@apollo/client';

export const ADD_OPERATION_QUERY = gql`
  mutation Add($input: OperationAddInput!) {
    operations {
      add(input: $input) {
        ... on Profit {
          id
          name
          desc
          date
          amount
          category {
            id
            name
            photo
          }
          type
          commandId
        }
        ... on Cost {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            id
            name
            photo
            createdAt
            updatedAt
            commandId
          }
          type
          commandId
        }
      }
    }
  }
`;
