import styles from './textarea-field.module.scss';
import { FC } from 'react';
import cn from 'clsx';

export type TextareaFieldPropTypes = {
  placeholder?: string;
  error?: string;
  type?: string;
};

export const TextareaField: FC<TextareaFieldPropTypes> = ({
  placeholder = '',
  error,
  ...rest
}) => {
  return (
    <>
      <textarea
        className={cn(styles.textarea, error && styles.error)}
        placeholder={placeholder}
        {...rest}
      />
      {error && <p className={cn(styles['error-hint'])}>{error}</p>}
    </>
  );
};
