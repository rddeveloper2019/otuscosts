import { gql } from '@apollo/client';

export const CATEGORY_QUERY = gql`
  query Data {
    categories {
      getMany {
        data {
          id
          name
          photo
          createdAt
          updatedAt
          commandId
        }
      }
    }
  }
`;
