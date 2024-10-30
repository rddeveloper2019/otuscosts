import styles from './signup-modal-form-feature.module.scss';
import { FC } from 'react';
import { Modal } from '@/shared/components/modal';
import { Card } from '@/shared/components/card';
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import cn from 'clsx';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { InputField } from '@/shared/components/input-field';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '@/features/signup-modal-form-feature/model';

export type RegistrationFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupModalFormFeatureProps = {
  visible?: boolean;
  onAction?: (message?: string) => void;
  onClose?: () => void;
};

export const SignupModalFormFeature: FC<SignupModalFormFeatureProps> = ({
  onAction,
  onClose,
  visible = false,
}) => {
  const { t } = useTranslation();
  const { handleSubmit: signup, loader } = useSignupMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleCancel = () => {
    clearErrors();
    reset();
    onAction?.();
    onClose?.();
  };

  const onConfirm: SubmitHandler<RegistrationFormType> = ({
    email,
    password,
  }) => {
    signup({
      email,
      password,
    });
    onAction?.();
    onClose?.();
  };

  const emailRules: RegisterOptions = {
    required: t('modal.form.validations.login'),
    minLength: 3,
  };

  const passwordRules: RegisterOptions = {
    required: t('modal.form.validations.password'),
    minLength: 3,
  };

  const confirmPasswordRules: RegisterOptions = {
    required: t('modal.form.validations.mismatch'),
    validate: (value) => value === watch('password'),
  };

  return (
    <>
      {loader()}
      <Modal visible={visible} backgroundClickHandler={handleCancel}>
        <Card className={styles['signup-form']}>
          <h1 className={cn(styles.title)}>{t('modal.headers.signup')}</h1>
          <form className={cn(styles.form)}>
            <Controller
              name="email"
              control={control as unknown as Control<FieldValues>}
              rules={emailRules}
              render={({ field }) => (
                <InputField
                  placeholder={t('modal.form.placeholders.login')}
                  error={
                    errors.email &&
                    (`${errors.email.message}` ||
                      t('modal.form.validations.minlength'))
                  }
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control as unknown as Control<FieldValues>}
              rules={passwordRules}
              render={({ field }) => (
                <InputField
                  type="password"
                  placeholder={t('modal.form.placeholders.password')}
                  error={
                    errors.password &&
                    (`${errors.password.message}` ||
                      t('modal.form.validations.minlength'))
                  }
                  {...field}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control as unknown as Control<FieldValues>}
              rules={confirmPasswordRules}
              render={({ field }) => (
                <InputField
                  type="password"
                  placeholder={t('modal.form.placeholders.repeatpassword')}
                  error={
                    errors.confirmPassword &&
                    (`${errors.confirmPassword.message}` ||
                      t('modal.form.validations.mismatch'))
                  }
                  {...field}
                />
              )}
            />
            <div className={cn(styles.buttons)}>
              <TextButton
                type="button"
                state={TextButtonState.PRIMARY}
                handleClick={handleSubmit(onConfirm)}
              >
                {t('modal.signup')}
              </TextButton>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
};
