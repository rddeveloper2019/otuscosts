import styles from './profile-widget.module.scss';
import { Card } from '@/shared/components/card';
import { ProfileEntity } from '@/entities';
import { FC } from 'react';
import { EditProfileFeature } from '@/features';
import { Profile } from '@/shared/types.ts';

type ProfileWidgetProps = {
  profile: Profile;
};

export const ProfileWidget: FC<ProfileWidgetProps> = ({ profile }) => {
  return (
    <div className={styles['profile-widget']}>
      <Card width={400}>
        <ProfileEntity profile={profile} />
        <div className={styles['features']}>
          <EditProfileFeature
            onEdit={() => console.log('profile widge edit profile clicked')}
          />
        </div>
      </Card>
    </div>
  );
};
