import styles from './profile-entity.module.scss';
import cn from 'clsx';
import { FC } from 'react';
import photo from '@/public/images/logo.png';
import { dateHelper } from '@/shared/utils/dateHelper.ts';
import { useAuthSelector } from '@/app/store/selectors.ts';
export type ProfileEntityProps = {
  onClick?: () => void;
  className?: string;
};

export const ProfileEntity: FC<ProfileEntityProps> = ({
  onClick,
  className,
}) => {
  const { profile } = useAuthSelector();
  const { signUpDate = '', email = '', name = '' } = profile ?? {};
  const operationDate =
    (signUpDate && dateHelper.utcToDateString(signUpDate)) || null;

  return (
    <div
      className={cn(className, styles['profile-entity'])}
      onClick={() => onClick?.()}
    >
      {photo && <img src={photo} alt="user logo" className={styles.photo} />}
      <div className={cn(styles['operation-entity-content'])}>
        <div className={cn(styles.email)}>
          <p>{email}</p>
        </div>
        {name && (
          <div className={cn(styles.email)}>
            <p>{name}</p>
          </div>
        )}
        {operationDate && (
          <div className={cn(styles['date'])}>{operationDate}</div>
        )}
      </div>
    </div>
  );
};
