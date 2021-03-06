import {useAddress, useDisconnect, useMetamask} from '@thirdweb-dev/react';

function useMetamaskLink() {
 const connectWithMetamask = useMetamask();
 const disconnectWallet = useDisconnect();
 const address = useAddress();

 return {
  connectWithMetamask,
  disconnectWallet,
  address,
  isConnected: Boolean(address),
 };
}

export default useMetamaskLink;
