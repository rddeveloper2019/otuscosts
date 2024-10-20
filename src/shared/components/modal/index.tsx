import { FC, MouseEventHandler, PropsWithChildren, ReactElement } from 'react';
import styles from './modal.module.scss';
import cn from 'clsx';
import { createPortal } from 'react-dom';

const container = document.body;

export type ModalPropSTypes = {
  children: ReactElement;
  visible?: boolean;
  backgroundClickHandler?: () => void;
};

export const Portal = ({ children }: PropsWithChildren) => {
  return createPortal(children, container);
};

export const Modal: FC<ModalPropSTypes> = ({
  children,
  backgroundClickHandler,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    if (event?.target !== event?.currentTarget) {
      return;
    }

    backgroundClickHandler?.();
  };

  return (
    <Portal>
      <div
        data-set-modal-wrapper="modal-wrapper"
        className={cn(styles.wrapper)}
        onClick={onClick}
      >
        <div className={cn(styles.modal)}>{children}</div>
      </div>
    </Portal>
  );
};
