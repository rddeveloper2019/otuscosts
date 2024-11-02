import styles from './layout.module.scss';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { AuthZone } from '@/app/providers/auth-zone';
import { useOperationsQuery } from '@/shared/models/operations/hooks/useOperationsQuery';
import { PaginationService } from '@/shared/services/PaginationService.ts';
import { useCategoriesQuery } from '@/shared/models';

export type LayoutProps = PropsWithChildren & {
  header: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ header, children }) => {
  const { loader, loadOperations, error } = useOperationsQuery();
  const { loader: categoriesLoader, loadData: loadCategories } =
    useCategoriesQuery();

  useEffect(() => {
    PaginationService.resetCounter();
    loadOperations();
    loadCategories();
  }, []);

  return (
    <>
      {loader() || categoriesLoader()}
      {error()}
      <div className={styles.layout}>
        <div>{header}</div>
        <AuthZone className={styles.content}>{children}</AuthZone>
      </div>
    </>
  );
};
