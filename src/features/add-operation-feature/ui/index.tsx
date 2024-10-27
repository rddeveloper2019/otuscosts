import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './add-operation-feature.module.scss';

type AddOperationFeatureProps = {
  onClick: () => void;
};

export const AddOperationFeature: FC<AddOperationFeatureProps> = ({
  onClick,
}) => {
  return (
    <TextButton
      type="button"
      state={TextButtonState.PRIMARY}
      className={styles['add-button']}
      handleClick={onClick}
    >
      +
    </TextButton>
  );
};
