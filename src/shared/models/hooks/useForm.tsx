import { FullscreenLoader } from '@/shared/components/fullscreen-loader';
import { FullScreenError } from '@/shared/components/full-screen-error/full-screen-error.tsx';
import {
  ApolloCache,
  DefaultContext,
  LazyQueryResultTuple,
  MutationTuple,
  OperationVariables,
} from '@apollo/client';

type gqlRequest<T> =
  | MutationTuple<T, OperationVariables, DefaultContext, ApolloCache<unknown>>
  | LazyQueryResultTuple<T, OperationVariables>;

export const useForm = <T,>(gql: gqlRequest<T>) => {
  const [proceed, variables] = gql;
  const { data, loading, error } = variables;

  const loader = () => <FullscreenLoader active={loading} />;

  const fullscreenError = () => (
    <FullScreenError
      error={error?.message}
      onClose={() =>
        (variables as { reset?: ApolloCache<unknown>['reset'] })?.reset?.()
      }
    />
  );

  const proceedForm = async <T extends OperationVariables>(
    variables: T
  ): Promise<void> => {
    await proceed({ variables });
  };

  return {
    data,
    proceedForm,
    loader,
    error,
    fullscreenError,
    loadData: proceed,
  };
};
