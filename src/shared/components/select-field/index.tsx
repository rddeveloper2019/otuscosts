import { ChangeEvent, FC, forwardRef, ReactNode } from 'react';

import styles from './select-field.module.scss';

export type SelectOption = {
  id: string;
  name: string;
};

export type CustomSelectProps = {
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  options: SelectOption[];
  categoryButtons?: ReactNode;
};

export const SelectField: FC<CustomSelectProps> = forwardRef(
  ({ options, onChange, value, categoryButtons, ...rest }) => {
    return (
      <div className={styles.row}>
        <select
          {...rest}
          value={value}
          onChange={onChange}
          className={styles.select}
        >
          <option value="" disabled className={styles.placeholder}>
            выберите категорию
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {categoryButtons && (
          <div className={styles.buttons}>{categoryButtons}</div>
        )}
      </div>
    );
  }
);
