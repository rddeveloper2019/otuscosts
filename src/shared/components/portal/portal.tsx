import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const container = document.body;

export const Portal = ({ children }: PropsWithChildren) => {
  return createPortal(children, container);
};
