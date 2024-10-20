import { FC, MouseEvent, ReactNode } from 'react';
import styles from './text-button.module.scss';
import cn from 'clsx';
import { TextButtonState } from '@/shared/components/text-button/types.ts';

type ButtonType = 'submit' | 'button';

export type TextButtonPropsTypes = {
  children: ReactNode;
  handleClick?: () => void;
  state?: TextButtonState;
  disabled?: boolean;
  className?: string;
  type: ButtonType;
};

export const TextButton: FC<TextButtonPropsTypes> = ({
  children = 'Click',
  state = TextButtonState.DEFAULT,
  handleClick,
  disabled = false,
  className,
  type,
  ...rest
}) => {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClick?.();
  };

  return (
    <button
      className={cn(
        styles['text-button'],
        styles[state],
        disabled && styles.disabled,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
