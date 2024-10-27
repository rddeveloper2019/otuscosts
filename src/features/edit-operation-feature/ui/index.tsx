import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './edit-operation-feature.module.scss';

type EditOperationFeatureProps = {
  onClick: () => void;
};

export const EditOperationFeature: FC<EditOperationFeatureProps> = ({
  onClick,
}) => {
  return (
    <TextButton
      type="button"
      state={TextButtonState.PRIMARY}
      className={styles['edit-button']}
      handleClick={onClick}
    >
      🖊️
    </TextButton>
  );
};
