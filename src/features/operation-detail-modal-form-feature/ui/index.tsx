import styles from './operation-detail-modal-form-feature.module.scss';
import { FC, ReactNode } from 'react';
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
import { SelectField } from '@/shared/components/select-field';
import { TextareaField } from '@/shared/components/textarea-field';
import { useTranslation } from 'react-i18next';
import {
  Operation,
  OperationAddInput,
  OperationUpdateInput,
} from '@/shared/api-types.ts';
import { useCategoriesSelector } from '@/app/store/selectors.ts';
import { useAddOperationMutation } from '@/shared/models';
import { dateHelper } from '@/shared/utils/dateHelper.ts';
import { useEditOperationMutation } from '@/shared/models/operations/hooks/usePatchOperationMutation';

export type OperationDetailModalFormFeatureProps = {
  onClose?: () => void;
  visible?: boolean;
  operation?: Operation;
  onOperationFormSubmit: (operation?: OperationFormType) => void;
  onCancel?: () => void;
  categoryButtons?: ReactNode;
};

export type OperationFormType = {
  id?: string;
  name: string;
  desc?: string;
  date: string;
  amount: string;
  categoryId: string;
  type?: 'Cost' | 'Profit';
};

export const OperationDetailModalFormFeature: FC<
  OperationDetailModalFormFeatureProps
> = ({
  onClose,
  visible,
  operation,
  onOperationFormSubmit,
  onCancel,
  categoryButtons,
}) => {
  const { t } = useTranslation();
  const { categories } = useCategoriesSelector();
  const { addNewOperation, loader, error } = useAddOperationMutation();
  const {
    editOperation,
    loader: patchLoader,
    error: patchError,
  } = useEditOperationMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<OperationFormType>({
    defaultValues: {
      name: operation?.name ?? '',
      desc: operation?.desc ?? '',
      date: operation?.date,
      amount: operation?.amount?.toString() ?? '',
      categoryId: operation?.category?.id ?? '',
    },
  });

  const closeModal = () => {
    clearErrors();
    reset();
    onClose?.();
    onCancel?.();
  };

  const onConfirm: SubmitHandler<OperationFormType> = ({
    name,
    desc,
    date,
    amount,
    categoryId,
  }) => {
    const variables: OperationUpdateInput = {
      name,
      desc,
      date: dateHelper.dateToIsoString(date),
      amount: Number(amount),
      categoryId,
    };
    reset({});
    onOperationFormSubmit?.();

    if (operation) {
      editOperation(operation.id, variables as OperationUpdateInput);
    } else {
      addNewOperation(variables as OperationAddInput);
    }

    closeModal();
    clearErrors();
    reset();
  };

  const nameRules: RegisterOptions = {
    required: t('modal.form.validations.operationname'),
    minLength: 3,
  };
  const amountRules: RegisterOptions = {
    required: t('modal.form.validations.operationsum'),
  };
  const dateRules: RegisterOptions = {
    required: t('modal.form.validations.operationdate'),
  };
  return (
    <>
      {loader() || patchLoader()}
      {error() || patchError()}
      <Modal
        visible={visible}
        onClose={onClose}
        backgroundClickHandler={closeModal}
      >
        <Card>
          <form className={cn(styles.form)} onSubmit={handleSubmit(onConfirm)}>
            <Controller
              name="name"
              control={control as unknown as Control<FieldValues>}
              rules={nameRules}
              render={({ field: { ref, ...otherProps } }) => (
                <InputField
                  placeholder={t('modal.form.placeholders.operationname')}
                  error={
                    errors.name &&
                    (`${errors.name.message}` ||
                      t('modal.form.validations.minlength'))
                  }
                  {...otherProps}
                />
              )}
            />
            <Controller
              name="amount"
              control={control as unknown as Control<FieldValues>}
              rules={amountRules}
              render={({ field: { ref, ...otherProps } }) => (
                <InputField
                  type="number"
                  placeholder={t('modal.form.placeholders.operationsum')}
                  error={errors.amount && `${errors.amount.message}`}
                  {...otherProps}
                />
              )}
            />
            <Controller
              name="categoryId"
              control={control as unknown as Control<FieldValues>}
              render={({ field: { onChange, ...rest } }) => (
                <SelectField
                  onChange={onChange}
                  {...rest}
                  options={categories}
                  categoryButtons={categoryButtons}
                />
              )}
            />
            <Controller
              name="date"
              defaultValue={' '}
              control={control as unknown as Control<FieldValues>}
              rules={dateRules}
              render={({ field: { ref, ...otherProps } }) => (
                <InputField
                  type="date"
                  placeholder={t('modal.form.placeholders.operationdate')}
                  error={errors.date && `${errors.date.message}`}
                  {...otherProps}
                />
              )}
            />
            <Controller
              name="desc"
              control={control as unknown as Control<FieldValues>}
              render={({ field: { ref, ...otherProps } }) => (
                <TextareaField
                  placeholder={t('modal.form.placeholders.additionalinfo')}
                  {...otherProps}
                />
              )}
            />

            <div className={cn(styles.buttons)}>
              <TextButton
                handleClick={closeModal}
                type="button"
                state={TextButtonState.SECONDARY}
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
