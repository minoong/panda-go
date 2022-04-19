import {BehaviorSubject, from, interval, repeat, switchMap, takeUntil, map, forkJoin, combineLatestWith} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {Market, MarketDetail, TickerProps} from '../types/market';

// const fetFetch = async () => {
//  return fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC').then((res) => res.json());
// };
// export const rawTicker$$ = timer(1, 3000).pipe(switchMap(() => fetFetch()));

function allMarketInfo<T>(): Promise<T> {
 return fetch('https://api.upbit.com/v1/market/all').then((response) => response.json());
}
function allMarketCandles<T>(): Promise<T> {
 return fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-XRP,KRW-WAVES').then((response) => response.json());
}

export interface CustomCandles extends TickerProps {
 symbol: string;
 isBookmark: boolean;
}

export type finishMarkets = CustomCandles & MarketDetail;

const rawTicker$ = new BehaviorSubject<CustomCandles[]>([]);

export const upbitWithLmw$ = forkJoin({
 markets: allMarketInfo<MarketDetail[]>(),
 candles: allMarketCandles<CustomCandles[]>(),
}).pipe(
 map(({markets, candles}) => {
  return candles.reduce((acc, candle) => {
   const market = markets.find((a) => a.market === candle.market)!;
   return [...acc, {...market, ...candle, symbol: 'LMW', isBookmark: false}];
  }, [] as finishMarkets[]);
 }),
);

export const bookmark$ = new BehaviorSubject<Market[]>([]);

export const market$ = upbitWithLmw$.pipe(
 combineLatestWith(bookmark$),
 map(([market, bookmark]) =>
  market.map((m) => {
   m.isBookmark = bookmark.includes(m.market);
   return m;
  }),
 ),
);

export const deck$ = market$.pipe(map((market) => market.filter((m) => m.isBookmark)));

// setInterval(() => {
//  fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC')
//   .then((res) => res.json())
//   .then((data) => rawTicker$.next(data));
// }, 1000 * 10);
fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-XRP,KRW-WAVES')
 .then((res) => res.json())
 .then((data) => rawTicker$.next(data));
