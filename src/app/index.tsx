import './index.scss';
import '@/shared/theme/fonts.scss';
import '@/shared/i18n.ts';
import { MainPage } from '@/pages/main-page';
import { Layout } from '@/shared/components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderWidget } from '@/widgets/header-widget/ui';
import { ProfilePage } from '@/pages/profile-page';
import { FavoritesPage } from '@/pages/favorites-page';
import { OperationDetailPage } from '@/pages/operation-detail-page';
import { NoFoundPage } from '@/pages/not-found-page';

const App = () => {
  return (
    <BrowserRouter>
      <Layout headerWidget={<HeaderWidget />}>
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
