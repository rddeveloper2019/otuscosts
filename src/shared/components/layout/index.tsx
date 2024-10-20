import styles from './layout.module.scss';
import { FC, PropsWithChildren, ReactNode } from 'react';

export type LayoutProps = PropsWithChildren & {
  header: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ header, children }) => {
  return (
    <div className={styles.layout}>
      <div>{header}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
