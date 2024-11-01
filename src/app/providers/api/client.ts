import { ApolloClient, InMemoryCache } from '@apollo/client';
import { commandId, URL } from '@/app/providers/api/constants/client.ts';
import { TokenService } from '@/shared/services/TokenService.ts';

const tokenService = TokenService.getInstance(commandId);

console.log('(**)=> tokenService.getToken(): ', tokenService.getToken());
export const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache({ resultCaching: false }),
  headers: {
    authorization: `Bearer ${tokenService.getToken()}`,
  },
});
