import {ModalProps} from '@components/commons/modal/Modal';
import {atom} from 'recoil';

export interface LmwModalType {
 modalProps: ModalProps;
}

export type ModalType = LmwModalType;

export const modalState = atom<ModalType | null>({
 key: 'modalState',
 default: null,
});
