import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { commandId, URL } from '@/app/providers/api/constants/client.ts';
import { TokenService } from '@/shared/services/TokenService.ts';
import { setContext } from '@apollo/client/link/context';

const tokenService = TokenService.getInstance(commandId);

const httpLink = createHttpLink({
  uri: URL,
});

const authLink = setContext((_, { headers }) => {
  const token = tokenService.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
