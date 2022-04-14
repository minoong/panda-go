import {BehaviorSubject, from, interval, repeat, switchMap, takeUntil, timer, map, combineLatestWith} from 'rxjs';
import {Market, UpbitProps} from '../types/market';

// const fetFetch = async () => {
//  return fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC').then((res) => res.json());
// };
// export const rawTicker$$ = timer(1, 3000).pipe(switchMap(() => fetFetch()));

export interface CustomCandles extends UpbitProps {
 symbol: string;
 isBookmark: boolean;
}

const rawTicker$ = new BehaviorSubject<CustomCandles[]>([]);

export const upbitWithLmw$ = rawTicker$.pipe(
 map((candles) =>
  candles.map((candle) => ({
   ...candle,
   symbol: 'LMW',
   isBookmark: false,
  })),
 ),
);

export const bookmark$ = new BehaviorSubject<Market[]>([]);

export const market$ = upbitWithLmw$.pipe(
 combineLatestWith(bookmark$),
 map(([market, bookmark]) =>
  market.map((m) => ({
   ...m,
   isBookmark: bookmark.includes(m.market),
  })),
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
