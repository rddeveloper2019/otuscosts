import { Header } from '@/shared/header';
import { Logo } from '@/shared/logo';
import { NavigationWidget } from '@/widgets/navigation-widget/ui';
import { UserWidget } from '@/widgets/user-widget/ui';

export const MainPage = () => {
  return (
    <>
      <Header
        logo={<Logo />}
        navigationWidget={<NavigationWidget />}
        userWidget={<UserWidget />}
      />
    </>
  );
};
