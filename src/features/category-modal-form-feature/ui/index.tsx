import { FC } from 'react';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import styles from './category-modal-form-feature.module.scss';
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
import { useTranslation } from 'react-i18next';
import { useAddCategoryMutation } from '@/shared/models';

export type CategoryFormType = {
  photo: string;
  name: string;
};

type CategoryModalFormFeature = {
  onEdit: () => void;
  visible: boolean;
  onCategoryModalClose: () => void;
  onDismiss?: () => void;
};

export const CategoryModalFormFeature: FC<CategoryModalFormFeature> = ({
  onEdit,
  visible,
  onCategoryModalClose,
  onDismiss,
}) => {
  const { error, handleSubmit: addCategory, loader } = useAddCategoryMutation();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CategoryFormType>({
    defaultValues: {
      name: '',
      photo: '',
    },
  });

  const handleCancel = () => {
    clearErrors();
    reset({});
    onDismiss?.();
  };

  const onConfirm: SubmitHandler<CategoryFormType> = ({ name, photo }) => {
    addCategory({ name, photo });
    reset({});
    onEdit?.();
  };

  const nameRules: RegisterOptions = {
    required: t('modal.form.validations.categoryname'),
    minLength: 3,
  };

  const photoRules: RegisterOptions = {
    required: t('modal.form.validations.photourl'),
    validate: (value) => {
      const httpRegex =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      return httpRegex.test(value) && value !== '';
    },
  };

  return (
    <>
      {loader()}
      {error()}
      <Modal
        visible={visible}
        backgroundClickHandler={handleCancel}
        onClose={onCategoryModalClose}
      >
        <Card>
          <form className={styles.form} onSubmit={handleSubmit(onConfirm)}>
            <Controller
              name="name"
              rules={nameRules}
              control={control as unknown as Control<FieldValues>}
              render={({ field }) => (
                <InputField
                  placeholder={t('modal.form.placeholders.categoryname')}
                  error={
                    errors.name &&
                    (`${errors.name.message}` ||
                      t('modal.form.validations.minlength'))
                  }
                  {...field}
                />
              )}
            />
            <Controller
              name="photo"
              rules={photoRules}
              control={control as unknown as Control<FieldValues>}
              render={({ field }) => (
                <InputField
                  placeholder={t('modal.form.placeholders.photourl')}
                  error={
                    errors.photo &&
                    (`${errors.photo.message}` ||
                      t('modal.form.validations.minlength'))
                  }
                  {...field}
                />
              )}
            />
            <div className={cn(styles.buttons)}>
              <TextButton
                type="button"
                state={TextButtonState.SECONDARY}
                handleClick={onCategoryModalClose}
              >
                {t('modal.cancel')}
              </TextButton>
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
