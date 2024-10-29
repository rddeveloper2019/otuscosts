import { ApolloClient, InMemoryCache } from '@apollo/client';
import { commandId, URL } from '@/app/providers/api/constants/client.ts';
import { TokenService } from '@/shared/services/TokenService.ts';

const tokenService = TokenService.getInstance(commandId);

export const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${tokenService.getToken()}` || '',
  },
});
