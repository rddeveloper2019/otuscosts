import { gql } from '@apollo/client';

export const OPERATIONS_QUERY = gql`
  query Data($input: OperationGetManyInput) {
    operations {
      getMany(input: $input) {
        data {
          ... on Profit {
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
        pagination {
          total
          pageSize
          pageNumber
        }
        sorting {
          type
          field
        }
      }
    }
  }
`;
