import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import Script from 'next/script';
import Providers from '@components/toast/Providers';

function MyApp({Component, pageProps}: AppProps) {
 console.log('APP IS RUNNING');
 return (
  <>
   <Script src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&callback=initMap`} />
   <SWRConfig
    value={{
     fetcher: (url: string) => fetch(url).then((response) => response.json()),
    }}
   >
    <Providers>
     <div className="w-full max-w-xl mx-auto">
      <Component {...pageProps} />
     </div>
    </Providers>
   </SWRConfig>
  </>
 );
}

export default MyApp;
