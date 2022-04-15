export type Market = 'KRW-BTC' | 'KRW-ETH';
export type Change = 'RISE' | 'EVEN' | 'FALL';
export interface MarketDetail {
 market: Market;
 korean_name: string;
 english_name: string;
}

export interface TickerProps {
 market: Market;
 trade_date: string;
 trade_time: string;
 trade_date_kst: string;
 trade_time_kst: string;
 trade_timestamp: number;
 opening_price: number;
 high_price: number;
 low_price: number;
 trade_price: number;
 prev_closing_price: number;
 change: Change;
 change_price: number;
 change_rate: number;
 signed_change_price: number;
 signed_change_rate: number;
 trade_volume: number;
 acc_trade_price: number;
 acc_trade_price_24h: number;
 acc_trade_volume: number;
 acc_trade_volume_24h: number;
 highest_52_week_price: number;
 highest_52_week_date: string;
 lowest_52_week_price: number;
 lowest_52_week_date: string;
 timestamp: string;
}
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
