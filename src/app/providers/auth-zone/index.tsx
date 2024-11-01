import { FC, ReactNode, useEffect } from 'react';
import { useAuthSelector } from '@/app/store/selectors.ts';
import styles from './auth-zone.module.scss';
import cn from 'clsx';
import { useLocation } from 'react-router-dom';
import { TokenService } from '@/shared/services/TokenService.ts';
import { commandId } from '@/app/providers/api/constants/client.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { signout } from '@/app/store/slices/authSlice.ts';
import { useTranslation } from 'react-i18next';
type AuthZoneProps = {
  children?: ReactNode;
  className?: string;
};
const tokenService = TokenService.getInstance(commandId);
export const AuthZone: FC<AuthZoneProps> = ({ children, className }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isAuth } = useAuthSelector();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!tokenService.checkToken()) {
      dispatch(signout());
    }
  }, [pathname]);

  return (
    <>
      <div className={className}>
        {!isAuth && (
          <div className={cn(styles['auth-zone'])}>{t('app.auth')}</div>
        )}
        {isAuth && children}
      </div>
    </>
  );
};
