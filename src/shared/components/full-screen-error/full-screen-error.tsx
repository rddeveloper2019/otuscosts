import { Modal } from '@/shared/components/modal';
import { FC } from 'react';
import { Card } from '@/shared/components/card';
import styles from './full-screen-error.module.scss';

export type FullScreenErrorProps = {
  error?: string;
  onClose: () => void;
};

export const FullScreenError: FC<FullScreenErrorProps> = ({
  error = '',
  onClose,
}) => {
  if (!error) return null;

  return (
    <Modal visible={!!error} backgroundClickHandler={onClose}>
      <Card className={styles['error-message']}>{error}</Card>
    </Modal>
  );
};
