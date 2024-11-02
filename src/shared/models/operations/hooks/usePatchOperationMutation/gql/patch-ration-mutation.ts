import { gql } from '@apollo/client';

export const PATCH_OPERATION_MUTATION = gql`
  mutation Patch($patchId: ID!, $input: OperationUpdateInput!) {
    operations {
      patch(id: $patchId, input: $input) {
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
          amount
          category {
            id
            name
            photo
          }
          type
          commandId
        }
      }
    }
  }
`;
