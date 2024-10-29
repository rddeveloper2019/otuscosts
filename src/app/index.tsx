import './index.scss';
import '@/app/theme/fonts.scss';
import '@/app/i18n.ts';
import { Layout } from '@/shared/components/layout';
import { Route, Routes } from 'react-router-dom';
import { HeaderWidget } from '@/widgets';
import {
  FavoritesPage,
  MainPage,
  NoFoundPage,
  OperationDetailPage,
  ProfilePage,
} from '@/pages';
import { AppProvider } from '@/app/providers/app-provider.tsx';

const App = () => {
  return (
    <AppProvider>
      <Layout header={<HeaderWidget />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/operation/:id" element={<OperationDetailPage />} />
          <Route path="*" element={<NoFoundPage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
};

export default App;
