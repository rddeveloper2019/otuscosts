import { OperationsFilterWidget, OperationsListWidget } from '@/widgets';
import { useNavigate } from 'react-router-dom';
import styles from './favorites-page.module.scss';
import { Operation } from '@/shared/api-types.ts';
import { useOperationsSelector } from '@/app/store/selectors.ts';

export const FavoritesPage = () => {
  const { operations } = useOperationsSelector();
  const navigate = useNavigate();

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
                operations={operations}
                onFilter={(data) => console.log(data)}
              />
              <OperationsListWidget
                operations={operations.filter(
                  (operation) => operation.isFavorite
                )}
                onItemSelect={redirectToDetail}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
