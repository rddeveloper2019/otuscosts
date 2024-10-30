import { SIGNUP_MUTATION } from './gql/signup-mutation.ts';
import { useMutation } from '@apollo/client';
import { commandId } from '@/app/providers/api/constants/client.ts';
import { AuthResult, ServerErrors, SignUpBody } from '@/shared/api-types.ts';
import { useForm } from '@/shared/hooks/useForm.tsx';

type MutationArgs = { profile: { signup: AuthResult } } & ServerErrors;

export const useSignupMutation = () => {
  const mutationTuple = useMutation<MutationArgs>(SIGNUP_MUTATION, {
    errorPolicy: 'all',
  });

  const { loader, fullscreenError, proceedForm } =
    useForm<MutationArgs>(mutationTuple);

  const handleSubmit = ({ email, password }: Omit<SignUpBody, 'commandId'>) => {
    proceedForm<SignUpBody>({
      email,
      password,
      commandId,
    });
  };

  return {
    error: fullscreenError,
    handleSubmit,
    loader,
  };
};
