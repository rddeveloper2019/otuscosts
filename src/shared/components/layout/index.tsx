import styles from './layout.module.scss';
import { FC, PropsWithChildren, ReactNode } from 'react';

export type LayoutProps = PropsWithChildren & {
  headerWidget: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ headerWidget, children }) => {
  return (
    <div className={styles.layout}>
      <div>{headerWidget}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
