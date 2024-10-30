import { SIGNUP_MUTATION } from './gql/signup-mutation.ts';
import { useMutation } from '@apollo/client';
import { commandId } from '@/app/providers/api/constants/client.ts';
import {
  AuthResult,
  ServerError,
  ServerErrors,
  SignUpBody,
} from '@/shared/api-types.ts';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader';

export const useSignupMutation = () => {
  const [signup, { data, reset, loading, error }] = useMutation<
    { profile: { signup: AuthResult } } & ServerErrors
  >(SIGNUP_MUTATION, {
    errorPolicy: 'all',
  });

  console.log('(**)=> data: ', { data: data?.profile?.signup });
  console.log('(**)=> error: ', {
    message: error?.message,
    code:
      error?.cause?.extensions && (error?.cause as ServerError).extensions.code,
  });

  const loader = () => <FullscreenLoader active={loading} />;

  const handleSubmit = ({ email, password }: Omit<SignUpBody, 'commandId'>) => {
    signup({
      variables: {
        email,
        password,
        commandId,
      },
    });
  };

  return {
    data: data?.profile?.signup,
    error: {
      message: error?.message,
      code:
        error?.cause?.extensions &&
        (error?.cause as ServerError).extensions.code,
    },
    handleSubmit,
    reset,
    loader,
  };
};
