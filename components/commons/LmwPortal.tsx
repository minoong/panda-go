import React, {useState, useLayoutEffect} from 'react';
import {createPortal} from 'react-dom';

interface LmwPortalProps {
 id?: string;
 children: React.ReactNode;
}

function createWrapperAndAppendToBody(id: string) {
 const wrapperElement = document.createElement('div');
 wrapperElement.setAttribute('id', id);
 const target = document.querySelector('#page')!;
 target.appendChild(wrapperElement);

 return wrapperElement;
}

const LmwPortal: React.FC<LmwPortalProps> = ({id = 'lmw-portal-wrapper', children}) => {
 const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

 useLayoutEffect(() => {
  const element = document.getElementById(id) || createWrapperAndAppendToBody(id);
  const systemCreated = !element ? true : false;
  setWrapperElement(element);

  return () => {
   if (systemCreated && element.parentNode) {
    element.parentNode.removeChild(element);
   }
  };
 }, [id]);

 if (wrapperElement === null) return null;

 return createPortal(children, wrapperElement);
};

export default LmwPortal;
