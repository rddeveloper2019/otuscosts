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

export type RegistrationFormType = {
  username: string;
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
  const { register } = { register: () => {} };

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormType>({
    defaultValues: {
      username: '',
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
    username,
    password,
  }) => {
    register();
    console.log('(**)=> onConfirm: ', {
      username,
      password,
    });
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

  const confirmPasswordRules: RegisterOptions = {
    required: 'Пароли не совпадают',
    validate: (value) => value === watch('password'),
  };

  return (
    <Modal visible={visible} backgroundClickHandler={handleCancel}>
      <Card className={styles['signup-form']}>
        <h1 className={cn(styles.title)}>Регистрация</h1>
        <form className={cn(styles.form)}>
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

          <Controller
            name="confirmPassword"
            control={control as unknown as Control<FieldValues>}
            rules={confirmPasswordRules}
            render={({ field }) => (
              <InputField
                type="password"
                placeholder="повторите пароль"
                error={
                  errors.confirmPassword &&
                  (`${errors.confirmPassword.message}` || 'пароли не совпадают')
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
              Зарегистрировать
            </TextButton>
          </div>
        </form>
      </Card>
    </Modal>
  );
};
