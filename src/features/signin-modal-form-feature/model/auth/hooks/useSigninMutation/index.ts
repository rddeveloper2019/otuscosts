import { SIGNIN_MUTATION } from './gql/signin-mutation.ts';
import { useMutation } from '@apollo/client';
import {
  AuthResult,
  ServerError,
  ServerErrors,
  SignUpBody,
} from '@/shared/api-types.ts';

export const useSigninMutation = () => {
  const [signin, { data, reset, loading, error }] = useMutation<
    { profile: { signin: AuthResult } } & ServerErrors
  >(SIGNIN_MUTATION, {
    errorPolicy: 'all',
  });

  console.log('(**)=> data: ', { data: data?.profile?.signin });
  console.log('(**)=> error: ', {
    message: error?.message,
    code:
      error?.cause?.extensions && (error?.cause as ServerError).extensions.code,
  });

  console.log('(**)=> loading: ', loading);

  const handleSubmit = ({ email, password }: Omit<SignUpBody, 'commandId'>) => {
    signin({
      variables: {
        email,
        password,
      },
    });
  };

  return {
    data: data?.profile?.signin,
    error: {
      message: error?.message,
      code:
        error?.cause?.extensions &&
        (error?.cause as ServerError).extensions.code,
    },
    handleSubmit,
    reset,
  };
};
