import { PropsWithChildren } from 'react';
import { AppConfigProvider } from '@/app/providers/app-config-provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/app/providers/api/client.ts';
import ErrorBoundary from '@/shared/components/error-boundary/error-boundary.tsx';
import { Provider } from 'react-redux';
import store from '@/app/store/store.ts';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppConfigProvider>
          <BrowserRouter>
            <ApolloProvider client={client}>{children}</ApolloProvider>
          </BrowserRouter>
        </AppConfigProvider>
      </Provider>
    </ErrorBoundary>
  );
};
