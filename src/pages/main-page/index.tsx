import { OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { useNavigate } from 'react-router-dom';
import { Operation } from '@/shared/types.ts';

export const MainPage = () => {
  const navigate = useNavigate();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  return (
    <div>
      <OperationsListWidget
        operations={operations}
        onItemSelect={redirectToDetail}
      />
    </div>
  );
};
