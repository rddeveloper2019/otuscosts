import styles from './operation-entity.module.scss';
import cn from 'clsx';
import { FC } from 'react';
import { Operation } from '@/shared/api-types.ts';
import { dateHelper } from '@/shared/utils/dateHelper.ts';

export type OperationEntityProps = {
  operation: Partial<Operation>;
  onClick?: () => void;
  className?: string;
  photo?: string;
};

export const OperationEntity: FC<OperationEntityProps> = ({
  operation,
  onClick,
  className,
}) => {
  const { amount, name, desc, category, date } = operation;

  const operationDate = dateHelper.utcToDateString(date ?? '');

  return (
    <>
      <div
        className={cn(className, styles['operation-entity'])}
        onClick={() => onClick?.()}
      >
        {category?.photo && (
          <img
            src={category?.photo}
            alt={operation.name}
            className={styles.photo}
          />
        )}
        <div className={cn(styles['operation-entity-content'])}>
          {category?.name && (
            <div className={cn(styles.category)}>{category.name}</div>
          )}
          {name && <div className={cn(styles.title)}>{name}</div>}
          {desc && <div className={cn(styles.description)}>{desc}</div>}
          {amount && (
            <div className={cn(styles.amount)}>
              {amount.toString().replace('.', ', ')} $
            </div>
          )}
          {operationDate && (
            <div className={cn(styles['created-at'])}>{operationDate}</div>
          )}
        </div>
      </div>
    </>
  );
};
