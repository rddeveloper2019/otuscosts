import { OperationsFilterWidget, OperationsListWidget } from '@/widgets';
import { useNavigate } from 'react-router-dom';
import styles from './favorites-page.module.scss';
import { Operation } from '@/shared/api-types.ts';
import { useOperationsSelector } from '@/app/store/selectors.ts';
import { isOperationFavorite } from '@/shared/utils/isOperationFavorite.ts';
import { useState } from 'react';

export const FavoritesPage = () => {
  const { operations } = useOperationsSelector();
  const navigate = useNavigate();
  const [filteredOperations, setFilteredOperations] = useState<Operation[]>([]);
  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  return (
    <>
      <div className={styles.split}>
        <div className={styles.content}>
          {!!operations.length && (
            <>
              <OperationsFilterWidget
                operations={operations.filter(isOperationFavorite)}
                onFilter={setFilteredOperations}
              />
              <OperationsListWidget
                operations={filteredOperations}
                onItemSelect={redirectToDetail}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
