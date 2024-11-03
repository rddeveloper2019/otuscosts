import { FC, useEffect } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './edit-profile-modal-form-feature.module.scss';
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
import { useModal } from '@/shared/hooks/useModal.ts';
import { useTranslation } from 'react-i18next';
import { Profile } from '@/shared/api-types.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { editProfile } from '@/app/store/slices/authSlice.ts';
import { useAuthSelector } from '@/app/store/selectors.ts';
import { useEditProfileMutation } from '@/shared/models';

export type ProfileFormType = {
  email: string;
  date: string;
  name?: string;
};

type EditProfileModalFormFeatureProps = {
  onEdit?: () => void;
};

export const EditProfileModalFormFeature: FC<
  EditProfileModalFormFeatureProps
> = ({ onEdit }) => {
  const { profile } = useAuthSelector();
  const { handleSubmit: save, loader, error, data } = useEditProfileMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
    formState,
  } = useForm<ProfileFormType>({
    defaultValues: {
      email: profile?.email || '',
      date: signUpDate,
      name: profile?.name || '',
    },
  });

  useEffect(() => {
    if (data) {
      const { profile } = data as unknown as { profile: { update: Profile } };

      profile &&
        profile?.update &&
        dispatch(
          editProfile({
            profile: profile.update,
          })
        );

      profile?.update &&
        reset({
          name: profile.update.name || '',
          email: profile.update.email,
          date: signUpDate,
        });
    }
  }, [data]);

  const handleCancel = () => {
    clearErrors();
    closeModal();
  };

  const onConfirm: SubmitHandler<ProfileFormType> = ({ name }) => {
    name && save({ name });
    closeModal();
    onEdit?.();
  };

  const emailRules: RegisterOptions = {
    required: t('modal.form.validations.email'),
    minLength: 3,
  };

  const nameRules: RegisterOptions = {
    required: t('modal.form.validations.nickname'),
    validate: (value) => {
      const nameRegex = /^[_a-zа-я0-9-]{7,}$/i;
      return nameRegex.test(value) && value !== '';
    },
    minLength: 7,
  };

  return (
    <>
      {loader()}
      {error()}
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
              disabled
              control={control as unknown as Control<FieldValues>}
              render={({ field }) => (
                <InputField
                  placeholder={t('modal.form.placeholders.username')}
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
              name="name"
              rules={nameRules}
              control={control as unknown as Control<FieldValues>}
              render={({ field }) => (
                <InputField
                  placeholder={t('modal.form.placeholders.name')}
                  error={
                    errors.name &&
                    (`${errors.name.message}` ||
                      t('modal.form.validations.nickname'))
                  }
                  {...field}
                />
              )}
            />
            <Controller
              name="date"
              disabled
              control={control as unknown as Control<FieldValues>}
              render={({ field: { ref, ...otherProps } }) => (
                <InputField
                  type="date"
                  placeholder={t('modal.form.placeholders.registerdate')}
                  error={errors.date && `${errors.date.message}`}
                  {...otherProps}
                />
              )}
            />
            <div className={cn(styles.buttons)}>
              <TextButton
                type="submit"
                state={TextButtonState.PRIMARY}
                disabled={!formState.dirtyFields.name}
              >
                {t('modal.save')}
              </TextButton>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
};
