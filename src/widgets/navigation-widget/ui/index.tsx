import TextButton from '@/shared/text-button';
import { NavLink } from 'react-router-dom';
import { TextButtonState } from '@/shared/text-button/types.ts';
import styles from './navigation-widget.module.scss';
import { useTranslation } from 'react-i18next';

export const NavigationWidget = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.links}>
      <TextButton state={TextButtonState.LINK} type="button">
        <NavLink to={'/'}>{t('header.home')}</NavLink>
      </TextButton>
      <TextButton state={TextButtonState.LINK} type="button">
        <NavLink to={'/favorites'}>{t('header.favorites')}</NavLink>
      </TextButton>

      <TextButton state={TextButtonState.LINK} type="button">
        <NavLink to={'/profile'}>{t('header.profile')}</NavLink>
      </TextButton>
    </div>
  );
};
