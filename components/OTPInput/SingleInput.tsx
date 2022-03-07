import usePrevious from '@hooks/usePrevious';
import {InputHTMLAttributes, memo, useEffect, useRef} from 'react';

interface SingleInputProps extends InputHTMLAttributes<HTMLInputElement> {
 focus?: boolean;
}

function SingleInput({focus, autoFocus, ...rest}: SingleInputProps) {
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
  <div className="rounded-md relative flex  items-center shadow-sm">
   <input
    ref={inputRef}
    {...rest}
    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
   />
  </div>
 );
}

export default memo(SingleInput);
