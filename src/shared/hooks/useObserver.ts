import { RefObject, useEffect, useState } from 'react';

export const useObserver = (
  ref: RefObject<HTMLDivElement>,
  options: IntersectionObserverInit
) => {
  const { rootMargin } = options;

  const [observedEntry, setObservedEntry] =
    useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setObservedEntry(entry);
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return [observedEntry];
};
