import { useState } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { useTranslation } from 'react-i18next';
import { TextButton } from '@/shared/components/text-button';

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
