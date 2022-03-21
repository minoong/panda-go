import {createContext, useCallback, useContext, useState} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {v4 as uuidv4} from 'uuid';
import ToastContainer, {ToastContainerProps} from './ToastContainer';
import {Truncate} from './ToastMessage';

export type ToastProviderProps = {
 children: React.ReactNode;
} & ToastContainerProps;

type ToastMessageType = 'Info' | 'Success' | 'Warning' | 'Error';

export type Toast = {
 id: string;
 lifetime: number;
 message: string | React.ReactNode;
 type?: ToastMessageType;
 truncate?: Truncate;
 icon?: IconProp;
 header?: string;
};

export type ToastContextType = {
 data: Array<Toast>;
 push(message: string, type: ToastMessageType, lifetime?: number, truncate?: Truncate): void;
 pushCustom(message: string | React.ReactNode, lifetime: number, truncate?: Truncate, icon?: IconProp | React.ReactNode): void;
 remove(id: string): void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

function uuid() {
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  var r = (Math.random() * 16) | 0,
   v = c == 'x' ? r : (r & 0x3) | 0x8;
  return v.toString(16);
 });
}

export const useToast = () => useContext(ToastContext);

const DEFAULT_INTERVAL = 2500;

export default function ToastProvider({children, variant}: ToastProviderProps) {
 console.log('ToastProvider');
 const [data, setData] = useState<Array<Toast>>([]);
 const Push = useCallback(
  (message: string, type: ToastMessageType, lifetime?: number, truncate?: Truncate) => {
   if (message) {
    const new_item: Toast = {
     id: uuid(),
     message: message,
     type: type,
     lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
     truncate: truncate,
    };

    setData((prevState) => [...prevState, new_item]);
   }
  },
  [setData],
 );

 const PushCustom = useCallback(
  (message: string | React.ReactNode, lifetime?: number, truncate?: Truncate, icon?: IconProp) => {
   if (message) {
    const new_item: Toast = {
     id: uuid(),
     message: message,
     lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
     truncate: truncate,
     icon: icon,
     type: undefined,
    };

    setData((prevState) => [...prevState, new_item]);
   }
  },
  [setData],
 );

 const ToastContexd = useCallback(() => {
  return {
   data: data,
   push: Push,
   pushCustom: PushCustom,

   async remove(id: string) {
    setData((prevState) => prevState.filter((e) => e.id != id));
   },
  };
 }, [data, setData, Push, PushCustom]);

 return (
  <ToastContext.Provider value={ToastContexd()}>
   <ToastContainer variant={variant} />
   {children}
  </ToastContext.Provider>
 );
}
