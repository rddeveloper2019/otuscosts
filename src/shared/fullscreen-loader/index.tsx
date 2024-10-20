import styles from './fullscreen-loader.module.scss';
import { FC } from 'react';

export type FullscreenLoaderProps = {
  active: boolean;
};

export const Index: FC<FullscreenLoaderProps> = ({ active }) => {
  if (!active) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles['lds-dual-ring']}></div>
    </div>
  );
};

export default Index;
