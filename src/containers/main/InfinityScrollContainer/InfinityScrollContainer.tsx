import { ReactNode, useEffect, useState } from 'react';

interface Props {
  length: number;
  children?: ReactNode;
  next: () => void;
  index: number;
}

const InfinityScroll = ({
  length, children, next, index,
}: Props) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const isLast = index === length - 1;

  useEffect(() => {
    const options = { threshold: 1, root: null, rootMargin: '2px' };

    const infiniteScroll = async (
      [entries] : IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      if (entries.isIntersecting) {
        next();
        observer.unobserve(entries.target);
      }
    };

    const io = new IntersectionObserver(infiniteScroll, options);
    if (target) io.observe(target);
    return () => io && io.disconnect();
  }, [target]);

  return <div ref={isLast ? setTarget : null}>{children}</div>;
};

export default InfinityScroll;
