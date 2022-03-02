import {TextareaHTMLAttributes} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
 label?: string;
 register: UseFormRegisterReturn;
}

export default function Textarea({label, name, register, ...rest}: TextareaProps) {
 return (
  <div>
   {label ? (
    <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
     {label}
    </label>
   ) : null}
   <textarea
    id={name}
    {...register}
    className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
    rows={4}
    {...rest}
   />
  </div>
 );
}
