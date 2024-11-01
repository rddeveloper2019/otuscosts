import styles from './auth-widget.module.scss';
import {
  AuthFeature,
  AuthModalFeature,
  SigninModalFormFeature,
  SignupModalFormFeature,
} from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';
import { ModalForm } from '@/widgets/auth-widget/model/constants.ts';

export const AuthWidget = () => {
  const authModalOptions = useModal();
  const signinModalOptions = useModal();
  const signupModalOptions = useModal();

  const onSignFormSelect = (formSelector: ModalForm) => {
    authModalOptions.closeModal();

    if (formSelector === ModalForm.SIGNIN) {
      signinModalOptions.openModal();
      return;
    }

    if (formSelector === ModalForm.SIGNUP) {
      signupModalOptions.openModal();
      return;
    }
  };

  const onClick = () => {
    authModalOptions.openModal();
  };

  return (
    <div className={styles['user-widget']}>
      <AuthFeature openModal={onClick} />
      <AuthModalFeature
        onSelect={onSignFormSelect}
        visible={authModalOptions.isModalOpen}
        onClose={authModalOptions.closeModal}
      />
      <SigninModalFormFeature
        visible={signinModalOptions.isModalOpen}
        onClose={signinModalOptions.closeModal}
      />
      <SignupModalFormFeature
        visible={signupModalOptions.isModalOpen}
        onClose={signupModalOptions.closeModal}
      />
    </div>
  );
};
