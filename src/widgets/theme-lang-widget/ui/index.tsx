import styles from './theme-lang-widget.module.scss';
import { LangFeature, ThemeFeature } from '@/features';

export const ThemeLangWidget = () => {
  return (
    <div className={styles['theme-lang-widget']}>
      <LangFeature />
      <ThemeFeature />
    </div>
  );
};
