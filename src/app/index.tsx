import './index.scss';
import '@/shared/theme/fonts.scss';
import '@/shared/i18n.ts';
import { MainPage } from '@/pages/main-page';
import { Layout } from '@/shared/components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '@/pages/profile-page';
import { FavoritesPage } from '@/pages/favorites-page';
import { OperationDetailPage } from '@/pages/operation-detail-page';
import { NoFoundPage } from '@/pages/not-found-page';
import { NavigationWidget, UserWidget } from '@/widgets';
import { Header } from '@/shared/components/header';
import { Logo } from '@/shared/components/logo';
import logo from '@/public/images/logo.png';

const HeaderWidget = () => (
  <Header
    logo={<Logo image={logo} color="white" />}
    userWidget={<UserWidget />}
    navigationWidget={<NavigationWidget />}
  />
);

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
