import { SearchingDataItem } from "shared/types/portfolio-detail.type";
export const sampleCryptoSearchData: Array<SearchingDataItem> = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
  },
  {
    id: "binance-usd",
    name: "Binance USD",
    symbol: "BUSD",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
  },
  {
    id: "binance-usd",
    name: "Binance USD",
    symbol: "BUSD",
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
  },
  {
    id: "axie-infinity",
    name: "Axie Infinity",
    symbol: "AXS",
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
  },
  {
    id: "stellar",
    name: "Stellar",
    symbol: "XLM",
  },
];

export const sampleStockSearchData: Array<SearchingDataItem> = [
  {
    id: "GOOG",
    name: "ALPHABET INC-CL C",
    symbol: "GOOG",
  },
  {
    id: "AAPL",
    name: "APPLE INC",
    symbol: "AAPL",
  },
  {
    id: "AMZN",
    name: "AMAZON.COM INC",
    symbol: "AMZN",
  },
  {
    id: "ADBE",
    name: "ADOBE INC",
    symbol: "ADBE",
  },
  {
    id: "FB",
    name: "META PLATFORMS INC-CLASS A",
    symbol: "FB",
  },
  {
    id: "TSLA",
    name: "TESLA INC",
    symbol: "TSLA",
  },
  {
    id: "MA",
    name: "MASTERCARD INC - A",
    symbol: "MA",
  },
  {
    id: "BCOC",
    name: "Boeing",
    symbol: "BCOC.BE",
  },
  {
    id: "SSUN.HA",
    name: "Samsung Electronics",
    symbol: "SSUN.HA",
  },
];

export const sampleSearchingData = {
  stock: sampleStockSearchData,
  crypto: sampleCryptoSearchData,
};
