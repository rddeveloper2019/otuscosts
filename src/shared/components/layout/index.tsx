import styles from './layout.module.scss';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { AuthZone } from '@/app/providers/auth-zone';
import { useOperationsQuery } from '@/shared/models/operations/hooks/useOperationsQuery';
import { useCategoriesQuery } from '@/shared/models';

export type LayoutProps = PropsWithChildren & {
  header: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ header, children }) => {
  const {
    loader: getOperationsLoader,
    loadOperations,
    error: getOperationsError,
  } = useOperationsQuery();

  const {
    loader: categoriesLoader,
    loadData: loadCategories,
    error: categoriesError,
  } = useCategoriesQuery();

  useEffect(() => {
    loadCategories().then(loadOperations);
  }, []);

  return (
    <>
      {getOperationsLoader() || categoriesLoader()}
      {getOperationsError() || categoriesError()}
      <div className={styles.layout}>
        <div>{header}</div>
        <AuthZone className={styles.content}>{children}</AuthZone>
      </div>
    </>
  );
};
