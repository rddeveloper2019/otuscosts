import { ProfileWidget } from '@/widgets';
import { useAuthSelector } from '@/app/store/selectors.ts';

export const ProfilePage = () => {
  const { profile } = useAuthSelector();
  if (!profile) {
    return null;
  }
  return <ProfileWidget />;
};
