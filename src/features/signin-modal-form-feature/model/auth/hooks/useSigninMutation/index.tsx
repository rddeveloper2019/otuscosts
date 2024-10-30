import { SIGNIN_MUTATION } from './gql/signin-mutation.ts';
import { useMutation } from '@apollo/client';
import { AuthResult, ServerErrors, SignInBody } from '@/shared/api-types.ts';
import { useForm } from '@/shared/hooks/useForm.tsx';

type MutationArgs = { profile: { signup: AuthResult } } & ServerErrors;

export const useSigninMutation = () => {
  const mutationTuple = useMutation<MutationArgs>(SIGNIN_MUTATION, {
    errorPolicy: 'all',
  });

  const { loader, fullscreenError, proceedForm } =
    useForm<MutationArgs>(mutationTuple);

  const handleSubmit = ({ email, password }: SignInBody) => {
    proceedForm<SignInBody>({
      email,
      password,
    });
  };

  return {
    error: fullscreenError,
    handleSubmit,
    loader,
  };
};
