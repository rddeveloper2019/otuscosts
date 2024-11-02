import { SIGNIN_MUTATION } from './gql/signin-mutation.ts';
import { useMutation } from '@apollo/client';
import { AuthResult, ServerErrors, SignInBody } from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';

type MutationArgs = { profile: { signin: AuthResult } } & ServerErrors;

export const useSigninMutation = () => {
  const mutationTuple = useMutation<MutationArgs>(SIGNIN_MUTATION, {
    errorPolicy: 'all',
  });

  const { loader, fullscreenError, proceedForm, data } =
    useForm<MutationArgs>(mutationTuple);

  const handleSubmit = async ({ email, password }: SignInBody) => {
    await proceedForm<SignInBody>({
      email,
      password,
    });
  };

  return {
    data,
    error: fullscreenError,
    handleSubmit,
    loader,
  };
};
