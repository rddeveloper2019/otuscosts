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
import { Operation } from '@/shared/api-types.ts';

export type OperationDetailModalFormFeatureProps = {
  onClose?: () => void;
  visible?: boolean;
  operation?: Operation;
  onOperationFormSubmit: (operation: OperationFormType) => void;
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
  photo?: string;
  isFavorite?: boolean;
  type?: 'Cost' | 'Profit';
};

const categories = [
  {
    id: '671e2ce48e877ac8a958160f',
    name: 'первая',
    photo: '',
    commandId: '44d72666-a601-4561-8dba-f20b6a141768',
    createdAt: '2024-10-27T12:07:00.449Z',
    updatedAt: '2024-10-27T12:07:00.449Z',
  },
  {
    id: '671e2cd88e877ac8a958160c',
    name: 'первая',
    photo: '',
    commandId: '44d72666-a601-4561-8dba-f20b6a141768',
    createdAt: '2024-10-27T12:06:48.753Z',
    updatedAt: '2024-10-27T12:06:48.753Z',
  },
  {
    id: '67194fa08e877ac8a957feb4',
    name: 'Телевизоры',
    photo:
      'https://c.dns-shop.ru/thumb/st1/fit/320/250/82ade714940a27eaad5a7299a3543379/9ddd721c9d0492f0af311b2440c0ce6e7eee472f62b8e2e965596dca6149f7a3.jpg',
    commandId: '44d72666-a601-4561-8dba-f20b6a141768',
    createdAt: '2024-10-23T19:33:52.898Z',
    updatedAt: '2024-10-23T19:33:52.898Z',
  },
  {
    id: '67194eca8e877ac8a957feb1',
    name: 'Игровые консоли',
    photo:
      'https://c.dns-shop.ru/thumb/st4/fit/320/250/3e0b3ad38f5960588742fb9443ec1229/2b2c9fcad6869829aefa2024ae5c07e03321376085bb672ea0f96d8ece8ab680.jpg',
    commandId: '44d72666-a601-4561-8dba-f20b6a141768',
    createdAt: '2024-10-23T19:30:18.386Z',
    updatedAt: '2024-10-23T19:30:18.386Z',
  },
  {
    id: '67194cc68e877ac8a957feae',
    name: 'Телефоны',
    photo:
      'https://c.dns-shop.ru/thumb/st1/fit/320/250/630a674d8ff4f19cbb5e4cc115784381/8517b5d57caefeef97194196729bd221e1606cafc9a005f423b21eb56314ba96.jpg',
    commandId: '44d72666-a601-4561-8dba-f20b6a141768',
    createdAt: '2024-10-23T19:21:42.905Z',
    updatedAt: '2024-10-23T19:21:42.905Z',
  },
  {
    id: '670c1e9a8e877ac8a957d026',
    name: 'Монтажные работы',
    commandId: '73c1044b-17ce-4309-a09f-25464e960d90',
    createdAt: '2024-10-13T19:25:14.584Z',
    updatedAt: '2024-10-13T19:25:14.584Z',
  },
  {
    id: '670bba768e877ac8a957cb25',
    name: 'Землянные работы',
    commandId: '73c1044b-17ce-4309-a09f-25464e960d90',
    createdAt: '2024-10-13T12:17:58.617Z',
    updatedAt: '2024-10-13T12:17:58.617Z',
  },
  {
    id: '66c9e5a18e877ac8a957232f',
    name: 'колбасы',
    photo: 'http://19429ba06ff2.vps.myjino.ru/img/kolbasa.jpg',
    commandId: 'Vitala',
    createdAt: '2024-08-24T13:52:33.337Z',
    updatedAt: '2024-08-24T13:52:33.337Z',
  },
  {
    id: '66c8bff38e877ac8a9571eda',
    name: 'test',
    photo: '',
    commandId: 'amake',
    createdAt: '2024-08-23T16:59:31.204Z',
    updatedAt: '2024-08-23T16:59:31.204Z',
  },
  {
    id: '66c8bd568e877ac8a9571dec',
    name: '1 Список',
    photo: null,
    commandId: '23209230423539',
    createdAt: '2024-08-23T16:48:22.215Z',
    updatedAt: '2024-08-23T16:48:22.215Z',
  },
];

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

  const createdAt = operation?.createdAt
    ? new Date(operation.createdAt).toLocaleDateString('en-CA')
    : '';

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
      date: createdAt,
      amount: operation?.amount?.toString() ?? '',
      categoryId: operation?.category?.id ?? '',
      photo: operation?.photo ?? '',
    },
  });

  const closeModal = () => {
    clearErrors();
    reset();
    onClose?.();
    onCancel?.();
  };

  const onConfirm: SubmitHandler<OperationFormType> = (data) => {
    clearErrors();
    reset();
    data.date = new Date(data.date).toISOString();
    onOperationFormSubmit?.(data);
    closeModal();
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
  );
};
