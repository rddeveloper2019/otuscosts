import { OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { useNavigate } from 'react-router-dom';
import { Operation } from '@/shared/types.ts';
import { FilterOperationsFeature } from '@/features';
import styles from './favorites-page.module.scss';

export const FavoritesPage = () => {
  const navigate = useNavigate();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  return (
    <>
      <div className={styles.split}>
        <div className={styles.content}>
          <FilterOperationsFeature min={100} max={1000} />
          <FilterOperationsFeature min={100} max={1000} />
          <OperationsListWidget
            operations={operations.filter((operation) => operation.isFavorite)}
            onItemSelect={redirectToDetail}
          />
        </div>
      </div>
    </>
  );
};
