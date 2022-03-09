import usePrevious from '@hooks/usePrevious';
import {InputHTMLAttributes, memo, useEffect, useRef} from 'react';

interface SingleInputProps extends InputHTMLAttributes<HTMLInputElement> {
 focus?: boolean;
}

function SingleInput({focus, autoFocus, className, ...rest}: SingleInputProps) {
 const inputRef = useRef<HTMLInputElement>(null);
 const prevFocus = usePrevious(!!focus);

 useEffect(() => {
  if (!inputRef.current) return;

  if (focus && autoFocus) {
   inputRef.current.focus();
   if (focus !== prevFocus) {
    inputRef.current.select();
   }
  }
 }, [autoFocus, focus, prevFocus]);
 return (
  <input
   ref={inputRef}
   className={`${className} appearance-none border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-center`}
   {...rest}
  />
 );
}

export default memo(SingleInput);
