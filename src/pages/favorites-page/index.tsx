import { OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { useNavigate } from 'react-router-dom';
import { Operation } from '@/shared/types.ts';

export const FavoritesPage = () => {
  const navigate = useNavigate();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  return (
    <div>
      <OperationsListWidget
        operations={operations.filter((operation) => operation.isFavorite)}
        onItemSelect={redirectToDetail}
      />
    </div>
  );
};
