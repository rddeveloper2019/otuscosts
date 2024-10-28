import { OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { useNavigate } from 'react-router-dom';
import { Operation } from '@/shared/types.ts';
import styles from './favorites-page.module.scss';
import { OperationsFilterWidget } from '@/widgets/operation-filters-widget/ui';

export const FavoritesPage = () => {
  const navigate = useNavigate();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  return (
    <>
      <div className={styles.split}>
        <div className={styles.content}>
          <OperationsFilterWidget
            operations={operations}
            onFilter={(data) => console.log(data)}
          />
          <OperationsListWidget
            operations={operations.filter((operation) => operation.isFavorite)}
            onItemSelect={redirectToDetail}
          />
        </div>
      </div>
    </>
  );
};
