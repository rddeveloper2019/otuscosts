import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styles from './card.module.scss';
import cn from 'clsx';
import { useObserver } from '@/shared/hooks/useObserver.ts';

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
  onIntersect,
  onClick,
  className,
  isLast = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [entry] = useObserver(cardRef, { rootMargin: '200px' });
  const [renderedEntry] = useObserver(cardRef, { rootMargin: '0px' });

  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!entry) return;

    if (entry.isIntersecting && isLast) {
      onIntersect?.();
    }
  }, [entry, isLast]);

  useEffect(() => {
    if (renderedEntry?.isIntersecting) {
      setInView(true);
    } else {
      setInView(false);
    }
  }, [renderedEntry]);

  return (
    <div
      className={cn(
        styles.card,
        inView ? styles.shown : styles.hidden,
        className
      )}
      style={{ width: width }}
      onClick={() => onClick?.()}
      ref={cardRef}
    >
      {children}
    </div>
  );
};
