import ActiveLink from '@components/ActiveLink';
import {cls} from '@libs/utils';
import React, {memo} from 'react';
import {IconType} from 'react-icons';

interface MenuProps {
 path: string;
 hoverClass?: string;
 Icon: IconType;
 name: {
  ko: string;
  en: string;
 };
}

const Menu: React.FC<MenuProps> = ({path, hoverClass = 'text-blue-700', Icon, name}) => {
 return (
  <ActiveLink activeClassName={hoverClass} defaultClassName="hover:text-gray-500 transition-colors hover:scale-125" href={path}>
   <a className={cls('flex flex-col items-center space-y-2')}>
    <Icon className="w-6 h-6" />
    <span className="hidden">{name.ko}</span>
   </a>
  </ActiveLink>
 );
};

export default memo(Menu);
