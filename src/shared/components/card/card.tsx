import { FC, PropsWithChildren } from 'react';
import styles from './card.module.scss';
import cn from 'clsx';

export type CardPropsType = PropsWithChildren<{
  width?: number;
  onClick?: () => void;
  onIntersect?: () => void;
  isLast?: boolean;
  className?: string;
}>;

export const Card: FC<CardPropsType> = ({
  children,
  width,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(styles.card, className)}
      style={{ width: width }}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );
};
