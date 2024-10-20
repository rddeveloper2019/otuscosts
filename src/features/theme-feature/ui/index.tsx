import { useState } from 'react';
import { Theme } from '@/shared/theme/types.ts';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import styles from './theme-feature.module.scss';
import { TextButton } from '@/shared/components/text-button';

export const ThemeFeature = () => {
  const [theme] = useState<Theme>(Theme.DARK);
  return (
    <TextButton
      type="button"
      state={TextButtonState.WHITE}
      className={styles.icon}
      handleClick={() => console.log('toggle theme')}
    >
      {theme === Theme.DARK && '☼'}
      {theme === Theme.LIGHT && '☾'}
    </TextButton>
  );
};
