import { useContext } from 'react';
import { Theme } from '@/app/theme/types.ts';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import styles from './theme-feature.module.scss';
import { TextButton } from '@/shared/components/text-button';
import { AppConfigContext } from '@/app/providers/app-config-provider.tsx';

export const ThemeFeature = () => {
  const { theme, setAppTheme } = useContext(AppConfigContext);

  const toggleTheme = () => {
    if (theme === Theme.LIGHT) {
      setAppTheme(Theme.DARK);
    } else {
      setAppTheme(Theme.LIGHT);
    }
  };

  return (
    <TextButton
      type="button"
      state={TextButtonState.WHITE}
      className={styles.icon}
      handleClick={toggleTheme}
    >
      {theme === Theme.DARK && '☼'}
      {theme === Theme.LIGHT && '☾'}
    </TextButton>
  );
};
