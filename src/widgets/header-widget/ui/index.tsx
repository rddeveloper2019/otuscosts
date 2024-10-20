import { FC } from 'react';
import { Header } from '@/shared/components/header';
import { Logo } from '@/shared/components/logo';
import logo from '@/public/images/logo.png';
import { NavigationWidget, UserWidget } from '@/widgets';

export const HeaderWidget: FC = () => {
  return (
    <Header
      logo={<Logo image={logo} color="white" />}
      navigationWidget={<NavigationWidget />}
      userWidget={<UserWidget />}
    />
  );
};
