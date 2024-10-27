import { FC, ReactNode } from 'react';
import styles from './header.module.scss';

type HeaderProps = {
  logo: ReactNode;
  navigationWidget: ReactNode;
  themeWidget: ReactNode;
  authWidget: ReactNode;
};

export const Header: FC<HeaderProps> = ({
  logo,
  navigationWidget,
  themeWidget,
  authWidget,
}) => {
  return (
    <div className={styles.header}>
      {logo}
      {navigationWidget}
      <div className={styles.widgets}>
        {themeWidget}
        {authWidget}
      </div>
    </div>
  );
};
