import styles from './fullscreen-loader.module.scss';
import { FC } from 'react';
import { Portal } from '@/shared/components/portal/portal.tsx';

export type FullscreenLoaderProps = {
  active: boolean;
};

export const FullscreenLoader: FC<FullscreenLoaderProps> = ({ active }) => {
  if (!active) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container}>
        <div className={styles['lds-dual-ring']}></div>
      </div>
    </Portal>
  );
};
