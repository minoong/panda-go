import React, {useEffect} from 'react';
import LmwPortal from '../LmwPortal';

interface ModalProps {
 isOpen: boolean;
 handleClose: () => void;
 children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, handleClose, children}) => {
 useEffect(() => {
  const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();

  document.body.addEventListener('keydown', closeOnEscapeKey);

  return () => document.body.removeEventListener('keydown', closeOnEscapeKey);
 }, [handleClose]);

 if (!isOpen) return null;

 return (
  <LmwPortal>
   <div className="lmw-modal">
    <div className="bg-black h-full fixed top-0 left-0 w-full bg-opacity-75" onClick={handleClose} />
    <div className="bg-white min-h-[150px] bottom-0 absolute right-0 left-0 toast-bottom rounded-t-lg z-50 py-6 px-6">{children}</div>
   </div>
  </LmwPortal>
 );
};

export default Modal;
