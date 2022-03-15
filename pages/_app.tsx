import '../styles/styles.css';
import type {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import Script from 'next/script';
import Providers from '@components/toast/Providers';

function MyApp({Component, pageProps}: AppProps) {
 console.log('APP IS RUNNING');
 return (
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
 );
}

export default MyApp;
