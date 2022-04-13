import {BehaviorSubject, from, interval, repeat, switchMap, takeUntil, timer, map} from 'rxjs';
import {UpbitProps} from '../types/market';

// const fetFetch = async () => {
//  return fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC').then((res) => res.json());
// };
// export const rawTicker$$ = timer(1, 3000).pipe(switchMap(() => fetFetch()));

export interface CustomCandles extends UpbitProps {
 symbol: string;
}

const rawTicker$ = new BehaviorSubject<CustomCandles[]>([]);

export const upbitWithLmw$ = rawTicker$.pipe(
 map((candles) =>
  candles.map((candle) => ({
   ...candle,
   symbol: 'LMW',
  })),
 ),
);

// setInterval(() => {
//  fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC')
//   .then((res) => res.json())
//   .then((data) => rawTicker$.next(data));
// }, 1000 * 10);
fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH')
 .then((res) => res.json())
 .then((data) => rawTicker$.next(data));
