import { FC, useState } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { useTranslation } from 'react-i18next';
import { TextButton } from '@/shared/components/text-button';

export type AuthFeaturePropTypes = {
  openModal?: () => void;
  logout?: () => void;
};

export const AuthFeature: FC<AuthFeaturePropTypes> = ({
  openModal,
  logout,
}) => {
  const [isAuth] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    !isAuth && openModal?.();
    isAuth && logout?.();
  };
  return (
    <TextButton
      type="button"
      state={TextButtonState.WHITE}
      handleClick={handleClick}
    >
      {isAuth && t('header.logout')}
      {!isAuth && t('header.login')}
    </TextButton>
  );
};
