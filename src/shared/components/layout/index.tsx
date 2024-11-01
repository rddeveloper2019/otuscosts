import styles from './layout.module.scss';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { AuthZone } from '@/app/providers/auth-zone';

export type LayoutProps = PropsWithChildren & {
  header: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ header, children }) => {
  return (
    <div className={styles.layout}>
      <div>{header}</div>
      <AuthZone className={styles.content}>{children}</AuthZone>
    </div>
  );
};
