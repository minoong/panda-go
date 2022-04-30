import useModal from '@hooks/useModal';
import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from 'recoil/modal';
import LmwPortal from '../LmwPortal';

type ModalHeightProps = 'full' | 'half' | 'auto';

export interface ModalProps {
 isOpen: boolean;
 handleClose?: () => void;
 children?: React.ReactNode;
 height?: ModalHeightProps;
}

const heightConfig: Record<ModalHeightProps, string> = {
 full: 'h-screen',
 auto: '',
 half: 'h-1/2',
};

const Modal: React.FC = () => {
 const {modalProps} = useRecoilState(modalState)[0] || {};
 const {disableModal} = useModal();

 const onDisableModal = modalProps?.handleClose || disableModal;

 useEffect(() => {
  const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && onDisableModal();

  document.body.addEventListener('keydown', closeOnEscapeKey);

  return () => document.body.removeEventListener('keydown', closeOnEscapeKey);
 }, [onDisableModal]);

 if (!modalProps?.isOpen) return null;

 return (
  <LmwPortal>
   <div className="lmw-modal">
    <div className="bg-black h-full fixed top-0 left-0 w-full bg-opacity-75 z-40" onClick={onDisableModal} />
    <div
     className={`bg-white min-h-[150px] bottom-0 absolute right-0 left-0 toast-bottom rounded-t-lg z-50 py-6 px-6 ${heightConfig[modalProps.height || 'auto']}`}
    >
     {modalProps.children}
    </div>
   </div>
  </LmwPortal>
 );
};

export default Modal;
