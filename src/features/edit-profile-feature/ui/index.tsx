import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './edit-profile-feature.module.scss';

type EditProfileFeatureProps = {
  onEdit: () => void;
};

export const EditProfileFeature: FC<EditProfileFeatureProps> = ({ onEdit }) => {
  return (
    <TextButton
      type="button"
      state={TextButtonState.PRIMARY}
      className={styles['edit-button']}
      handleClick={onEdit}
    >
      🖊️
    </TextButton>
  );
};
