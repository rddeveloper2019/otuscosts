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
import { Category } from '@/shared/types.ts';

export type CategoryFormType = {
  photo: string;
  name: string;
};

type CategoryModalFormFeature = {
  category?: Category;
  onEdit: () => void;
  visible: boolean;
  onCategoryModalClose: () => void;
};

export const CategoryModalFormFeature: FC<CategoryModalFormFeature> = ({
  category,
  onEdit,
  visible,
  onCategoryModalClose,
}) => {
  const signUpDate = category?.createdAt
    ? new Date(category.createdAt).toLocaleDateString('en-CA')
    : '';
  console.log('(**)=> signUpDate: ', signUpDate);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CategoryFormType>({
    defaultValues: {
      name: category?.name || '',
      photo: category?.photo || '',
    },
  });

  const handleCancel = () => {
    clearErrors();
    reset();
  };

  const onConfirm: SubmitHandler<CategoryFormType> = ({ name, photo }) => {
    console.log('(**)=> save category: ', { name, photo });
    onEdit?.();
  };

  const nameRules: RegisterOptions = {
    required: 'Невалидное имя категории',
    minLength: 3,
  };

  const photoRules: RegisterOptions = {
    required: 'Невалидный URL',
    validate: (value) => {
      const httpRegex =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      return httpRegex.test(value) && value !== '';
    },
  };

  return (
    <>
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
                  placeholder="Наименование категории"
                  error={
                    errors.name &&
                    (`${errors.name.message}` || 'Не менее 3-х символов')
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
                  placeholder="Ссылка на изображение"
                  error={
                    errors.photo &&
                    (`${errors.photo.message}` || 'Не менее 3-х символов')
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
                CANCEL
              </TextButton>
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
