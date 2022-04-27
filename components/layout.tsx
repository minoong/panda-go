import {cls} from '@libs/utils';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {BsCurrencyBitcoin} from 'react-icons/bs';
import {BiHome} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import {FaRegCommentDots} from 'react-icons/fa';
import ActiveLink from './ActiveLink';
import Menu from './nav/Menu';
import MenuList from '@containers/nav/MenuList';

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
    <title>{seoTitle || title} | Pando-go</title>
   </Head>
   <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium fixed text-gray-800 border-b top-0 flex items-center">
    {canGoBack && (
     <button onClick={onClick} className="absolute left-4">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
      </svg>
     </button>
    )}
    {title && <span className={cls(canGoBack ? 'mx-auto' : '', '')}>{title}</span>}
   </div>
   <div className={cls('pt-12 h-screen overflow-auto', hasTabBar ? 'pb-24' : '')}>{children}</div>
   {hasTabBar && <MenuList />}
  </div>
 );
}
