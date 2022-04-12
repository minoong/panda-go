import React from 'react';
import Menu from '@components/nav/Menu';
import {BsCurrencyBitcoin} from 'react-icons/bs';
import {BiHome} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import {FaRegCommentDots} from 'react-icons/fa';

const MenuList = () => {
 return (
  <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
   <Menu path="/" Icon={BiHome} name={{en: 'home', ko: '홈'}} />
   <Menu path="market" Icon={BsCurrencyBitcoin} name={{en: 'market', ko: '마켓'}} />
   <Menu path="community" Icon={FaRegCommentDots} name={{en: 'community', ko: '커뮤니티'}} />
   <Menu path="profile" Icon={CgProfile} name={{en: 'profile', ko: '프로파일'}} />
  </nav>
 );
};

export default MenuList;
