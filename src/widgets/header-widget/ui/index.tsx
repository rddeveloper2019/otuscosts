import { Header } from '@/shared/components/header';
import { Logo } from '@/shared/components/logo';
import logo from '@/public/images/logo.png';
import { NavigationWidget, UserWidget } from '@/widgets';

export const HeaderWidget = () => (
  <Header
    logo={<Logo image={logo} color="white" />}
    userWidget={<UserWidget />}
    navigationWidget={<NavigationWidget />}
  />
);
