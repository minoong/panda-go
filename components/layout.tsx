import {cls} from '@libs/utils';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import ActiveLink from './ActiveLink';

interface LayOutProps {
 title?: string;
 canGoBack?: boolean;
 hasTabBar?: boolean;
 children: React.ReactNode;
 seoTitle?: string;
}

export default function Layout({title, canGoBack, hasTabBar, children, seoTitle}: LayOutProps) {
 const router = useRouter();
 const onClick = useCallback(() => router.back(), [router]);

 return (
  <div>
   <Head>
    <title>{seoTitle} | Pando-go</title>
   </Head>
   <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
    {canGoBack && (
     <button onClick={onClick} className="absolute left-4">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
      </svg>
     </button>
    )}
    {title && <span className={cls(canGoBack ? 'mx-auto' : '', '')}>{title}</span>}
   </div>
   <div className={cls('pt-12', hasTabBar ? 'pb-24' : '')}>{children}</div>
   {hasTabBar && (
    <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
     <ActiveLink activeClassName="text-orange-500" defaultClassName="hover:text-gray-500 transition-colors" href="/">
      <a className={cls('flex flex-col items-center space-y-2')}>
       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        ></path>
       </svg>
       <span>홈</span>
      </a>
     </ActiveLink>
    </nav>
   )}
  </div>
 );
}
