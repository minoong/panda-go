export type Market = 'KRW-BTC' | 'KRW-ETH';

export interface UpbitProps {
 market: Market;
 candle_date_time_utc: Date;
 candle_date_time_kst: Date;
 opening_price: number;
 high_price: number;
 low_price: number;
 trade_price: number;
 timestamp: number;
 candle_acc_trade_price: number;
 candle_acc_trade_volume: number;
 unit: number;
}
