import styles from './user-widget.module.scss';
import { AuthFeature, LangFeature, ThemeFeature } from '@/features';
export const UserWidget = () => {
  return (
    <div className={styles['user-widget']}>
      <LangFeature />
      <ThemeFeature />
      <AuthFeature />
    </div>
  );
};
