import { FC } from 'react';
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

export type ProfileFormType = {
  email: string;
  date: string;
};

type EditProfileModalFormFeatureProps = {
  profile: Profile;
  onEdit?: () => void;
};

export const EditProfileModalFormFeature: FC<
  EditProfileModalFormFeatureProps
> = ({ profile, onEdit }) => {
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
    required: t('modal.form.validations.email'),
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
              name="date"
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
              <TextButton type="submit" state={TextButtonState.PRIMARY}>
                {t('modal.save')}
              </TextButton>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
};
