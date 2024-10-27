import styles from './signin-modal-form-feature.module.scss';
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

export type SigninFormType = {
  username: string;
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
  // const { login } = useAuthentication();

  const { login } = { login: () => {} };

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<SigninFormType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleCancel = () => {
    clearErrors();
    reset();
    onClose?.();
    onAction?.();
  };

  const onConfirm: SubmitHandler<SigninFormType> = ({ username, password }) => {
    // login({ email: username, password });
    login();
    console.log('(**)=> onConfirm: ', { username, password });
    onAction?.();
    onClose?.();
  };

  const usernameRules: RegisterOptions = {
    required: 'Невалидное имя пользователя',
    minLength: 3,
  };
  const passwordRules: RegisterOptions = {
    required: 'Невалидный пароль',
    minLength: 3,
  };

  return (
    <Modal visible={visible} backgroundClickHandler={handleCancel}>
      <Card className={styles['login-form']}>
        <h1 className={cn(styles.title)}>Вход</h1>
        <form className={cn(styles.form)} onSubmit={handleSubmit(onConfirm)}>
          <Controller
            name="username"
            control={control as unknown as Control<FieldValues>}
            rules={usernameRules}
            render={({ field }) => (
              <InputField
                placeholder="введите логин"
                error={
                  errors.username &&
                  (`${errors.username.message}` || 'Не менее 3-х символов')
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
                placeholder="введите пароль"
                error={
                  errors.password &&
                  (`${errors.password.message}` || 'Не менее 3-х символов')
                }
                {...field}
              />
            )}
          />

          <div className={cn(styles.buttons)}>
            <TextButton type="submit" state={TextButtonState.PRIMARY}>
              Войти
            </TextButton>
          </div>
        </form>
      </Card>
    </Modal>
  );
};
