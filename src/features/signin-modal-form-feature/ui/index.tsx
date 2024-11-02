import styles from './signin-modal-form-feature.module.scss';
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
import { signin } from '@/app/store/slices/authSlice.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { useSigninMutation } from '@/shared/models';

export type SigninFormType = {
  email: string;
  password: string;
};

export type SigninModalFormFeatureProps = {
  visible?: boolean;
  onAction?: () => void;
  onClose?: () => void;
};

export const SigninModalFormFeature: FC<SigninModalFormFeatureProps> = ({
  onAction,
  onClose,
  visible = false,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { handleSubmit: login, loader, error, data } = useSigninMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<SigninFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (data) {
      const { profile } = data as unknown as {
        profile: { signin: AuthResult };
      };
      profile &&
        profile?.signin &&
        dispatch(
          signin({
            token: profile.signin.token,
            profile: profile.signin.profile,
          })
        );
    }
  }, [data]);

  const handleCancel = () => {
    clearErrors();
    onClose?.();
    onAction?.();
    reset({});
  };

  const onConfirm: SubmitHandler<SigninFormType> = ({ email, password }) => {
    login({ email, password });
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

  return (
    <>
      {loader()}
      {error()}
      <Modal visible={visible} backgroundClickHandler={handleCancel}>
        <Card className={styles['login-form']}>
          <h1 className={cn(styles.title)}>{t('modal.headers.signin')}</h1>
          <form className={cn(styles.form)} onSubmit={handleSubmit(onConfirm)}>
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

            <div className={cn(styles.buttons)}>
              <TextButton type="submit" state={TextButtonState.PRIMARY}>
                {t('modal.signin')}
              </TextButton>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
};
