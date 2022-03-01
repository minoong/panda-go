import Link, {LinkProps} from 'next/link';
import {useRouter} from 'next/router';
import {Children, cloneElement, useEffect, useState} from 'react';

interface ActiveLinkProps extends React.PropsWithChildren<LinkProps> {
 activeClassName: string;
 defaultClassName: string;
 children: React.ReactNode;
}

export default function ActiveLink({activeClassName, defaultClassName, children, ...props}: ActiveLinkProps) {
 const {asPath, isReady} = useRouter();
 const child = Children.only<JSX.Element>(children as JSX.Element);
 const childClassName = `${child.props.className || ''} ${defaultClassName}`;
 const [className, setClassName] = useState(childClassName);

 useEffect(() => {
  if (isReady) {
   const linkPathname = new URL((props.as as URL) || props.href, location.href).pathname;
   const activePathname = new URL(asPath, location.href).pathname;
   const newClassName = linkPathname === activePathname ? `${childClassName} ${activeClassName}`.trim() : childClassName;

   if (newClassName !== className) {
    setClassName(newClassName);
   }
  }
 }, [asPath, isReady, props.as, props.href, childClassName, activeClassName, setClassName, className]);

 return (
  <Link {...props}>
   {cloneElement(child, {
    className: className || null,
   })}
  </Link>
 );
}
