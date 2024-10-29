import { PropsWithChildren } from 'react';
import { AppConfigProvider } from '@/app/providers/app-config-provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/app/providers/api/client.ts';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppConfigProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </BrowserRouter>
    </AppConfigProvider>
  );
};
