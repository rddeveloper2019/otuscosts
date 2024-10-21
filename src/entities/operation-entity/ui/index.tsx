import styles from './operation-entity.module.scss';
import cn from 'clsx';
import { FC } from 'react';
import { Operation } from '@/shared/types.ts';

export type OperationEntityProps = {
  operation: Partial<Operation>;
  onClick: () => void;
  className?: string;
};

export const OperationEntity: FC<OperationEntityProps> = ({
  operation,
  onClick,
  className,
}) => {
  const {
    id,
    amount,
    name,
    desc,
    category,
    createdAt = '',
    isFavorite,
    photo,
  } = operation;
  console.log('(**)=> isFavorite: ', isFavorite);
  console.log('(**)=> id: ', id);

  const operationDate = new Date(createdAt.toString()).toLocaleDateString('RU');

  return (
    <div
      className={cn(className, styles['operation-entity'])}
      onClick={onClick}
    >
      <div className={cn(styles.logo)}>
        {photo && <img src={photo} alt={name} />}
      </div>
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
        {createdAt && (
          <div className={cn(styles['created-at'])}>{operationDate}</div>
        )}
      </div>
      <div className={styles['edit-buttons']}>
        {/*<TextButton*/}
        {/*  type="button"*/}
        {/*  state={isFavorite ? TextButtonState.SECONDARY : TextButtonState.PRIMARY}*/}
        {/*  className={cn(styles['edit-button'], styles.large)}*/}
        {/*  handleClick={onFavoriteItemToggle}*/}
        {/*>*/}
        {/*  ★*/}
        {/*</TextButton>*/}

        {/*{isAuth && isButtonActive && (*/}
        {/*  <TextButton*/}
        {/*    type="button"*/}
        {/*    state={TextButtonState.PRIMARY}*/}
        {/*    className={styles['edit-button']}*/}
        {/*    handleClick={openEditForm}*/}
        {/*  >*/}
        {/*    🖊️*/}
        {/*  </TextButton>*/}
        {/*)}*/}
        {/*{modal && (*/}
        {/*  <ModalControl backgroundClickHandler={() => setModal(false)}>*/}
        {/*    <OperationForm operation={data} onOperationFormSubmit={editOperation} onCancel={() => setModal(false)} />*/}
        {/*  </ModalControl>*/}
        {/*)}*/}
      </div>
    </div>
  );
};
