import './index.scss';
import '@/shared/theme/fonts.scss';
import '@/shared/i18n.ts';
import { Layout } from '@/shared/components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderWidget } from '@/widgets';
import {
  FavoritesPage,
  MainPage,
  NoFoundPage,
  OperationDetailPage,
  ProfilePage,
} from '@/pages';

const App = () => {
  return (
    <BrowserRouter>
      <Layout header={<HeaderWidget />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/operation/:id" element={<OperationDetailPage />} />{' '}
          <Route path="*" element={<NoFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
