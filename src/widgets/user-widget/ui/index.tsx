import styles from './user-widget.module.scss';
import {
  AuthFeature,
  AuthModalFeature,
  LangFeature,
  SigninModalFormFeature,
  SignupModalFormFeature,
  ThemeFeature,
} from '@/features';

export const UserWidget = () => {
  return (
    <div className={styles['user-widget']}>
      <LangFeature />
      <ThemeFeature />
      <AuthFeature />
      <AuthModalFeature visible={false} onSelect={console.log} />
      <SigninModalFormFeature visible={false} />
      <SignupModalFormFeature visible={true} />
    </div>
  );
};
