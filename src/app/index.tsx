import './index.scss';
import '@/shared/i18n.ts';
import { MainPage } from '@/pages/main-page';
import { Layout } from '@/shared/components/layout';
import { Logo } from '@/shared/components/logo';
import logo from '@/public/images/logo.png';
import { NavigationWidget } from '@/widgets/navigation-widget/ui';
import { UserWidget } from '@/widgets/user-widget/ui';
import { Header } from '@/shared/components/header';

const App = () => {
  return (
    <Layout
      header={
        <Header
          logo={<Logo image={logo} color="white" />}
          navigationWidget={<NavigationWidget />}
          userWidget={<UserWidget />}
        />
      }
    >
      <MainPage />
    </Layout>
  );
};

export default App;
