import { LangFeature } from '@/features/lang-feature/ui';
import { AuthFeature } from '@/features/auth-feature/ui';
import { ThemeFeature } from '@/features/theme-feature/ui';
import styles from './user-widget.module.scss';
export const UserWidget = () => {
  return (
    <div className={styles['user-widget']}>
      <LangFeature />
      <ThemeFeature />
      <AuthFeature />
    </div>
  );
};
