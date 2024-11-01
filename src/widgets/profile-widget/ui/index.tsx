import styles from './profile-widget.module.scss';
import { Card } from '@/shared/components/card';
import { ProfileEntity } from '@/entities';
import { EditProfileModalFormFeature } from '@/features';

export const ProfileWidget = () => {
  return (
    <div className={styles['profile-widget']}>
      <Card>
        <ProfileEntity />
        <div className={styles['features']}>
          <EditProfileModalFormFeature />
        </div>
      </Card>
    </div>
  );
};
