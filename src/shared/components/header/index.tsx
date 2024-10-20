import styles from './header.module.scss';
import { FC, ReactNode } from 'react';

type HeaderProps = {
  logo: ReactNode;
  navigationWidget: ReactNode;
  userWidget: ReactNode;
};

export const Header: FC<HeaderProps> = ({
  logo,
  navigationWidget,
  userWidget,
}) => {
  return (
    <div className={styles.header}>
      {logo}
      {navigationWidget}
      {userWidget}
    </div>
  );
};
