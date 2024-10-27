import styles from './profile-entity.module.scss';
import cn from 'clsx';
import { FC } from 'react';
import { Profile } from '@/shared/types.ts';
import photo from '@/public/images/logo.png';
export type ProfileEntityProps = {
  profile: Profile;
  onClick?: () => void;
  className?: string;
};

export const ProfileEntity: FC<ProfileEntityProps> = ({
  profile,
  onClick,
  className,
}) => {
  const { signUpDate, email } = profile;
  const operationDate =
    (signUpDate && new Date(signUpDate.toString()).toLocaleDateString('RU')) ||
    null;

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
        {operationDate && (
          <div className={cn(styles['date'])}>{operationDate}</div>
        )}
      </div>
    </div>
  );
};
