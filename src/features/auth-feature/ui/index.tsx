import { useState } from 'react';
import TextButton from '@/shared/text-button';
import { TextButtonState } from '@/shared/text-button/types.ts';
import { useTranslation } from 'react-i18next';

export const AuthFeature = () => {
  const [isAuth] = useState(false);
  const { t } = useTranslation();

  return (
    <TextButton
      type="button"
      state={TextButtonState.WHITE}
      handleClick={() => console.log('signout')}
    >
      {isAuth && t('header.logout')}
      {!isAuth && t('header.login')}
    </TextButton>
  );
};
