import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './edit-profile-feature.module.scss';
import { Modal } from '@/shared/components/modal';
import { Card } from '@/shared/components/card';
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
import { Profile } from '@/shared/types.ts';
import { useModal } from '@/shared/hooks/useModal.ts';

export type ProfileFormType = {
  email: string;
  date: string;
};

type EditProfileModalFormFeatureProps = {
  profile: Profile;
  onEdit: () => void;
};

export const EditProfileModalFormFeature: FC<
  EditProfileModalFormFeatureProps
> = ({ profile, onEdit }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const signUpDate = profile?.signUpDate
    ? new Date(profile.signUpDate).toLocaleDateString('en-CA')
    : '';

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<ProfileFormType>({
    defaultValues: {
      email: profile?.email || '',
      date: signUpDate,
    },
  });

  const handleCancel = () => {
    clearErrors();
    reset();
  };

  const onConfirm: SubmitHandler<ProfileFormType> = ({ email, date }) => {
    console.log('(**)=> save profile: ', { email, date });
    onEdit?.();
  };

  const emailRules: RegisterOptions = {
    required: 'Невалидный email',
    minLength: 3,
  };

  return (
    <>
      <TextButton
        type="button"
        state={TextButtonState.PRIMARY}
        className={styles['edit-button']}
        handleClick={openModal}
      >
        🖊️
      </TextButton>
      <Modal
        visible={isModalOpen}
        backgroundClickHandler={handleCancel}
        onClose={closeModal}
      >
        <Card>
          <form className={styles.form} onSubmit={handleSubmit(onConfirm)}>
            <Controller
              name="email"
              rules={emailRules}
              control={control as unknown as Control<FieldValues>}
              render={({ field }) => (
                <InputField
                  placeholder="Ваш логин "
                  error={
                    errors.email &&
                    (`${errors.email.message}` || 'Не менее 3-х символов')
                  }
                  {...field}
                />
              )}
            />
            <Controller
              name="date"
              control={control as unknown as Control<FieldValues>}
              render={({ field: { ref, ...otherProps } }) => (
                <InputField
                  type="date"
                  placeholder="Дата регистрации"
                  error={errors.date && `${errors.date.message}`}
                  {...otherProps}
                />
              )}
            />
            <div className={cn(styles.buttons)}>
              <TextButton type="submit" state={TextButtonState.PRIMARY}>
                SAVE
              </TextButton>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
};
