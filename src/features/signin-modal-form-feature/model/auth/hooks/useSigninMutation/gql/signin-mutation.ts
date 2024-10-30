import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
        profile {
          id
          name
          email
          signUpDate
          commandId
        }
      }
    }
  }
`;
