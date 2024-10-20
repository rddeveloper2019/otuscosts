import React, { ChangeEvent } from 'react';

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
};

export const SelectField: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  value,
  ...rest
}) => {
  return (
    <select
      {...rest}
      value={value}
      onChange={onChange}
      className={styles.select}
    >
      <option></option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
