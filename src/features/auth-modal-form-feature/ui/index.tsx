import styles from './auth-modal-form-feature.module.scss';
import { FC } from 'react';
import { Modal } from '@/shared/components/modal';
import { Card } from '@/shared/components/card';
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import cn from 'clsx';
import { ModalForm } from '@/widgets/auth-widget/model/constants.ts';
import { useTranslation } from 'react-i18next';

export type AuthModalFeatureProps = {
  onSelect: (type: ModalForm) => void;
  onClose?: () => void;
  visible?: boolean;
};

export const AuthModalFeature: FC<AuthModalFeatureProps> = ({
  onSelect,
  onClose,
  visible,
}) => {
  const { t } = useTranslation();
  const showRegisterForm = () => {
    onSelect(ModalForm.SIGNUP);
  };

  const showLoginForm = () => {
    onSelect(ModalForm.SIGNIN);
  };

  return (
    <Modal visible={visible} onClose={onClose} backgroundClickHandler={onClose}>
      <Card className={cn(styles['auth-modal-feature'], styles['p-40'])}>
        <TextButton
          handleClick={showRegisterForm}
          type="button"
          state={TextButtonState.PRIMARY}
        >
          🔑 {t('modal.signup')}
        </TextButton>

        <TextButton
          type="button"
          state={TextButtonState.SECONDARY}
          handleClick={showLoginForm}
        >
          🔓 {t('modal.signin')}
        </TextButton>
      </Card>
    </Modal>
  );
};
