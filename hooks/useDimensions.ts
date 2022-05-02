import React, {useRef} from 'react';
import useResize from './useResize';

interface IProps {
 maxHeight: number;
 margin?: {
  top: number;
  right: number;
  bottom: number;
  left: number;
 };
 scaleCoef?: number;
}

interface DomRectProps {
 svgWidth: number;
 svgHeight: number;
 width: number;
 height: number;
}

const useDimensions = ({maxHeight, margin = {top: 0, right: 0, bottom: 0, left: 0}, scaleCoef = 0.5}: IProps) => {
 const ref = useRef<HTMLDivElement>(null);
 const {width} = useResize(ref);

 const height = !maxHeight || width * scaleCoef < maxHeight ? width * scaleCoef : maxHeight;
 const innerWidth = width - (margin.left || 0) - (margin.right || 0);
 const innerHeight = height - (margin.top || 0) - (margin.bottom || 0);

 return [
  ref,
  {
   svgWidth: width,
   svgHeight: height,
   width: innerWidth,
   height: innerHeight,
  },
 ] as [React.RefObject<HTMLDivElement>, DomRectProps];
};

export default useDimensions;
