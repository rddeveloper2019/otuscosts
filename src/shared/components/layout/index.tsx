import styles from './layout.module.scss';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { AuthZone } from '@/app/providers/auth-zone';
import { useOperationsQuery } from '@/shared/models/operations/hooks/useOperationsQuery';
import { PaginationService } from '@/shared/services/PaginationService.ts';

export type LayoutProps = PropsWithChildren & {
  header: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ header, children }) => {
  const { loader, loadOperations, error } = useOperationsQuery();

  useEffect(() => {
    PaginationService.resetCounter();
    loadOperations();
  }, []);

  return (
    <>
      {loader()}
      {error()}
      <div className={styles.layout}>
        <div>{header}</div>
        <AuthZone className={styles.content}>{children}</AuthZone>
      </div>
    </>
  );
};
