import styles from './signup-modal-form-feature.module.scss';
import { FC, useEffect } from 'react';
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
import { AuthResult } from '@/shared/api-types.ts';
import { signup } from '@/app/store/slices/authSlice.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { useSignupMutation } from '@/shared/models';

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit: register, loader, error, data } = useSignupMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<RegistrationFormType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (data) {
      const { profile } = data as unknown as {
        profile: { signup: AuthResult };
      };

      profile &&
        profile?.signup &&
        dispatch(
          signup({
            token: profile.signup.token,
            profile: profile.signup.profile,
          })
        );
    }
  }, [data]);

  const handleCancel = () => {
    clearErrors();
    reset({});
    onAction?.();
    onClose?.();
  };

  const onConfirm: SubmitHandler<RegistrationFormType> = ({
    email,
    password,
  }) => {
    register({
      email,
      password,
    });
    onAction?.();
    onClose?.();
    reset({});
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
      {error()}
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
                disabled={!isDirty}
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
