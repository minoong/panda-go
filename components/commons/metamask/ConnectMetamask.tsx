import React, {useState} from 'react';
import Image from 'next/image';
import {HiOutlineLogin} from 'react-icons/hi';
import {ImSpinner5} from 'react-icons/im';
import useMetamaskLink from '@hooks/useMetamaskLink';

const ConnectMetamask: React.FC = () => {
 const [loading, setLoading] = useState<Boolean>(false);
 const {connectWithMetamask, isConnected, address} = useMetamaskLink();
 const onConnectWallet = async () => {
  setLoading(true);
  const promise = new Promise((resolve) => {
   setTimeout(async () => {
    const data = await connectWithMetamask();
    resolve(data);
   }, 2000);
  });

  promise
   .then((data) => {
    console.log(data);
   })
   .finally(() => setLoading(false));
 };
 return (
  <div
   className="grid grid-cols-10 cursor-pointer hover:bg-slate-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-md p-[2px]"
   onClick={() => onConnectWallet()}
  >
   <div className="p-[0.8px] items-center justify-center flex bg-gradient-to-r from-purple-500 to-pink-500 rounded-md">
    <Image
     src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
     alt="MetaMask"
     width="100%"
     height="100%"
     quality="100"
    />
   </div>
   <div className="col-span-7 flex text-gray-800 font-bold items-center pl-2">METAMASK</div>
   <div className="col-span-2 flex items-center justify-center">
    {loading && <ImSpinner5 className="animate-spin text-emerald-500" size="24" />}
    {!loading && !isConnected && <HiOutlineLogin size="24" className="text-emerald-500 animate-bounce" />}
    {address && (
     <div className="relative text-xs text-gray-700 font-bold">
      {address.slice(0, 5)}...{address.slice(address.length - 4)}
      <span className="absolute w-4 h-4 bg-green-600 border-2 border-white rounded-full top-[-5px] right-[-10px] animate-pulse"></span>
     </div>
    )}
   </div>
  </div>
 );
};

export default ConnectMetamask;
