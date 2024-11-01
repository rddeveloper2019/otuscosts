import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { useTranslation } from 'react-i18next';
import { TextButton } from '@/shared/components/text-button';
import { useAuthSelector } from '@/app/store/selectors.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { signout } from '@/app/store/slices/authSlice.ts';

export type AuthFeaturePropTypes = {
  openModal?: () => void;
};

export const AuthFeature: FC<AuthFeaturePropTypes> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuthSelector();

  const { t } = useTranslation();

  const handleClick = () => {
    !isAuth && openModal?.();
    isAuth && dispatch(signout());
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
