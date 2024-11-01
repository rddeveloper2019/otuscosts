import { FullscreenLoader } from '@/shared/components/fullscreen-loader';
import { FullScreenError } from '@/shared/components/full-screen-error/full-screen-error.tsx';
import { ServerError } from '@/shared/api-types.ts';
import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  OperationVariables,
} from '@apollo/client';

export const useForm = <T,>(
  mutation: MutationTuple<
    T,
    OperationVariables,
    DefaultContext,
    ApolloCache<unknown>
  >
) => {
  const [proceed, { data, reset, loading, error }] = mutation;

  console.log('(**)=> error: ', {
    message: error?.message,
    code:
      error?.cause?.extensions && (error?.cause as ServerError).extensions.code,
  });

  const loader = () => <FullscreenLoader active={loading} />;

  const fullscreenError = () => (
    <FullScreenError error={error?.message} onClose={() => reset?.()} />
  );

  const proceedForm = <T extends OperationVariables>(variables: T) => {
    proceed({ variables });
  };

  return {
    data,
    proceedForm,
    loader,
    fullscreenError,
  };
};
