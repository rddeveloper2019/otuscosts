import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './favorite-toggle-feature.module.scss';
import cn from 'clsx';

type FavoriteToggleFeatureProps = {
  id?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export const FavoriteToggleFeature: FC<FavoriteToggleFeatureProps> = ({
  id,
  isFavorite = false,
  onToggleFavorite,
}) => {
  console.log('(**)=>FavoriteToggleFeature id: ', id);
  return (
    <TextButton
      type="button"
      state={isFavorite ? TextButtonState.SECONDARY : TextButtonState.PRIMARY}
      className={cn(styles['favorite-toggle-button'], styles.large)}
      handleClick={() => onToggleFavorite?.()}
    >
      ★
    </TextButton>
  );
};
