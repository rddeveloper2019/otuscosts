import styles from './not-found-page.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return <p className={styles.page}>404 {t('app.404')}</p>;
};
