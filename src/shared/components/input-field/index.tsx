import styles from './input-field.module.scss';
import { FC } from 'react';
import cn from 'clsx';

export type InputFieldPropTypes = {
  placeholder?: string;
  error?: string;
  type?: string;
};

export const InputField: FC<InputFieldPropTypes> = (
  { placeholder = '', error, type = 'text', ...rest }
  // ref
) => {
  return (
    <>
      <input
        className={cn(styles.input, error && styles.error)}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
      {error && <p className={cn(styles['error-hint'])}>{error}</p>}
    </>
  );
};
