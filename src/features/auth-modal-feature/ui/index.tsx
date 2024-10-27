import styles from './auth-modal-feature.module.scss';
import { FC } from 'react';
import { Modal } from '@/shared/components/modal';
import { Card } from '@/shared/components/card';
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import cn from 'clsx';

export type AuthModalFeatureProps = {
  visible?: boolean;
  onSelect: (type: string) => void;
};
export const AuthModalFeature: FC<AuthModalFeatureProps> = ({
  onSelect,
  visible = false,
}) => {
  const showRegisterForm = () => {
    onSelect('showRegisterForm');
  };

  const showLoginForm = () => {
    onSelect('showLoginForm');
  };

  return (
    <Modal visible={visible}>
      <Card className={cn(styles['auth-modal-feature'], styles['p-40'])}>
        <TextButton
          handleClick={showRegisterForm}
          type="button"
          state={TextButtonState.PRIMARY}
        >
          🔑 Регистрация
        </TextButton>

        <TextButton
          type="button"
          state={TextButtonState.SECONDARY}
          handleClick={showLoginForm}
        >
          🔓 Вход
        </TextButton>
      </Card>
    </Modal>
  );
};
