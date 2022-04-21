import {Avatar, ListItem, ListItemAvatar, ListItemButton} from '@mui/material';
import {CustomCandles, finishMarkets} from '@rxjs/store';
import React from 'react';
import {TickerProps} from 'types/market';

interface MarketRowProps
 extends Pick<
  finishMarkets,
  'korean_name' | 'market' | 'change' | 'isBookmark' | 'signed_change_rate' | 'trade_price' | 'signed_change_price' | 'acc_trade_price_24h'
 > {
 onChange: () => void;
}

const changeClass = {
 RISE: 'text-red-600',
 EVEN: 'text-gray-600',
 FALL: 'text-blue-600',
};

const MarketRow: React.FC<MarketRowProps> = ({
 market,
 korean_name,
 change,
 isBookmark,
 signed_change_rate,
 signed_change_price,
 acc_trade_price_24h,
 trade_price,
 onChange,
}) => {
 return (
  <ListItem secondaryAction={<input type="checkbox" checked={isBookmark} onChange={onChange} />} disablePadding>
   <ListItemButton>
    <ListItemAvatar>
     <Avatar alt={market} src={`/markets/${market.split('-')[1]}.png`} />
    </ListItemAvatar>
    <div className="w-full grid grid-cols-4 text-sm font-medium">
     <div className="flex flex-col">
      <div>{korean_name}</div>
      <div className="text-xs">{market}</div>
     </div>
     <div className={`${changeClass[change]}`}>{trade_price.toLocaleString()}</div>
     <div className={`${changeClass[change]}`}>
      <div>{(signed_change_rate * 100).toFixed(2)}%</div>
      <div>{signed_change_price.toLocaleString()}</div>
     </div>
     <div>{acc_trade_price_24h}</div>
    </div>
   </ListItemButton>
  </ListItem>
 );
};

export default MarketRow;
