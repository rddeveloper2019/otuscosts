import { Header } from '@/shared/components/header';
import { Logo } from '@/shared/components/logo';
import logo from '@/public/images/logo.png';
import { AuthWidget, NavigationWidget, ThemeLangWidget } from '@/widgets';

export const HeaderWidget = () => {
  return (
    <Header
      logo={<Logo image={logo} color="white" />}
      themeWidget={<ThemeLangWidget />}
      authWidget={<AuthWidget />}
      navigationWidget={<NavigationWidget />}
    />
  );
};
