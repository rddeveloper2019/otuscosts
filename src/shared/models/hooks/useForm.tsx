import { FullscreenLoader } from '@/shared/components/fullscreen-loader';
import { FullScreenError } from '@/shared/components/full-screen-error/full-screen-error.tsx';
import { ServerError } from '@/shared/api-types.ts';
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

  console.log('(**)=> error: ', {
    message: error?.message,
    code:
      error?.cause?.extensions && (error?.cause as ServerError).extensions.code,
  });

  const loader = () => <FullscreenLoader active={loading} />;

  const fullscreenError = () => (
    <FullScreenError
      error={error?.message}
      onClose={() =>
        (variables as { reset?: ApolloCache<unknown>['reset'] })?.reset?.()
      }
    />
  );

  const proceedForm = <T extends OperationVariables>(variables: T) => {
    proceed({ variables });
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
