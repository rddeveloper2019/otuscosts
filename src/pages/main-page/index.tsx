import { OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';

export const MainPage = () => {
  return (
    <div>
      <OperationsListWidget operations={operations} />
    </div>
  );
};
