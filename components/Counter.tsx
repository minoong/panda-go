import React from 'react';

interface CounterProps {
 label?: string;
 value?: number;
 minValue?: number;
 maxValue?: number;
 step?: number;
 onChnage: (value: number) => void;
}

function Counter({label, value = 0, minValue = 0, maxValue = 10, step = 1, onChnage}: CounterProps) {
 return (
  <div>
   {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
   <div className="mt-1 flex justify-between items-center">
    <button
     className="rounded-full border w-8 h-8 hover:border-indigo-500/100"
     type="button"
     disabled={value === minValue}
     onClick={() => onChnage(value - step)}
    >
     -
    </button>
    <span className="font-medium">{value}</span>
    <button
     className="rounded-full border w-8 h-8 hover:border-indigo-500/100"
     type="button"
     disabled={value === maxValue}
     onClick={() => onChnage(value + step)}
    >
     +
    </button>
   </div>
  </div>
 );
}

export default React.memo(Counter);
