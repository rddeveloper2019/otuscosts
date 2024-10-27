import { ProfileWidget } from '@/widgets';
import { Profile } from '@/shared/types.ts';

const profile: Profile = {
  _id: '66f80d9a8e877ac8a9573dea',
  signUpDate: '2024-09-28T14:07:22.805Z',
  email: 'test2000@valid.mail',
  password: '$2b$08$CXCYvUovSHoZB.7NIJPShuI4LSLInvHXVl.5K6ZDYXpiFbf3trLZ2',
  __v: 0,
};

export const ProfilePage = () => {
  return <ProfileWidget profile={profile} />;
};
