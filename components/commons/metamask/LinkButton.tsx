import React from 'react';
import {HiOutlineLogout} from 'react-icons/hi';
import {CgProfile} from 'react-icons/cg';
import useMetamaskLink from '@hooks/useMetamaskLink';
import useModal from '@hooks/useModal';
import ConnectMetamask from './ConnectMetamask';

const LinkButton = () => {
 const {address, isConnected, connectWithMetamask, disconnectWallet} = useMetamaskLink();
 const {enableModal} = useModal();

 const onEnableModal = () => {
  enableModal({
   modalProps: {
    isOpen: true,
    children: <ConnectMetamask />,
   },
  });
 };

 return (
  <>
   {address ? (
    <button className="absolute right-4 w-auto bg-orange-500 hover:bg-orange-600 text-gray-900 px-2 border border-transparent rounded-xl shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm  focus:outline-none">
     <span className="flex flex-row items-center">
      {address.slice(0, 5)}...{address.slice(address.length - 4)} <HiOutlineLogout className="ml-3" onClick={disconnectWallet} />
     </span>
    </button>
   ) : (
    <button onClick={onEnableModal} className="absolute right-4 text-gray-500 hover:text-gray-800 transition hover:scale-110">
     <CgProfile size="24" />
    </button>
   )}
  </>
 );
};

export default LinkButton;
