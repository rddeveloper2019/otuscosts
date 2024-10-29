import { SIGNUP_MUTATION } from './gql/mutation-signup.ts';
import { useMutation } from '@apollo/client';
import { commandId } from '@/app/providers/api/constants/client.ts';

export const useSignupMutation = () => {
  const [signup, { data, error, reset }] = useMutation(SIGNUP_MUTATION, {
    errorPolicy: 'all',
  });

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    signup({
      variables: {
        email: username,
        password,
        commandId,
      },
    });
  };

  return {
    data,
    error,
    handleSubmit,
    reset,
  };
};
