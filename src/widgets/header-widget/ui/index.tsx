import { FC } from 'react';
import { Header } from '@/shared/components/header';
import { Logo } from '@/shared/components/logo';
import { NavigationWidget } from '@/widgets/navigation-widget/ui';
import { UserWidget } from '@/widgets/user-widget/ui';
import logo from '@/public/images/logo.png';

export const HeaderWidget: FC = () => {
  return (
    <Header
      logo={<Logo image={logo} color="white" />}
      navigationWidget={<NavigationWidget />}
      userWidget={<UserWidget />}
    />
  );
};
