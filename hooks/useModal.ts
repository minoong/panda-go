import {useRecoilState} from 'recoil';
import {modalState, ModalType} from 'recoil/modal';

function useModal() {
 const [modal, setModal] = useRecoilState(modalState);

 const enableModal = ({modalProps}: ModalType) => {
  setModal({modalProps});
 };

 const disableModal = () => {
  setModal({modalProps: {isOpen: false}});
 };

 return {
  modal,
  setModal,
  enableModal,
  disableModal,
 };
}

export default useModal;
