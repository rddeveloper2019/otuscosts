import { EDIT_PROFILE_MUTATION } from './gql/edit-profile-mutation.ts';
import { useMutation } from '@apollo/client';
import {
  Profile,
  ServerErrors,
  UpdateProfileInput,
} from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';

type MutationArgs = { profile: { update: Profile } } & ServerErrors;

export const useEditProfileMutation = () => {
  const mutationTuple = useMutation<MutationArgs>(EDIT_PROFILE_MUTATION, {
    errorPolicy: 'all',
  });

  const { loader, fullscreenError, proceedForm, data } =
    useForm<MutationArgs>(mutationTuple);

  const handleSubmit = ({ name }: UpdateProfileInput) => {
    proceedForm<{ input: UpdateProfileInput }>({
      input: {
        name,
      },
    });
  };

  return {
    data,
    error: fullscreenError,
    handleSubmit,
    loader,
  };
};
