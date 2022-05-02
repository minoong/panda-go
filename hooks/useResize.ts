import React, {useEffect, useState} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResize = (ref: React.RefObject<HTMLElement>) => {
 const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

 useEffect(() => {
  if (!ref.current) return;

  const element = ref.current;
  const resizeObserver = new ResizeObserver((entries) => {
   entries.forEach((entry) => {
    setDimensions(entry.contentRect);
   });
  });

  resizeObserver.observe(element);

  return () => {
   resizeObserver.unobserve(element);
  };
 }, [ref]);
 return (
  dimensions || {
   width: 0,
   height: 0,
   top: 0,
   left: 0,
  }
 );
};

export default useResize;
