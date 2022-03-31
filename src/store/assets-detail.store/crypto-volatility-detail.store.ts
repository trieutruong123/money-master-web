import { coinGeckoService } from 'services';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { portfolioData } from '../portfolio/portfolio-data';
class CryptoVolatilityDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  //transactionHistoryData: Array<any> = [];
  historicalMarketData: Array<any> = [];
  coinId: string = '';
  coinMarketData: any = undefined;
  //coinDetail: any | undefined = undefined;
  timeInterval: number = 1;
  currencyCode: string = 'usd';

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      historicalMarketData: observable,
      coinId: observable,
      coinMarketData: observable,

      setOpenAddNewTransactionModal: action,
      fetchData: action,
      fetchHistoricalMarketData: action,
      setCoinId: action,
      setTimeInterval: action,
      setCurrency: action,

      getAssetDetail: computed,
      getTransactionHistoryData: computed,
    });
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setCoinId(code: string) {
    this.coinId = code;
  }

  setTimeInterval(interval: number) {
    this.timeInterval = interval;
  }

  setCurrency(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  async fetchData({ code }: { code: string }) {
    this.coinMarketData = await this.fetchCoinInfoByCode({ code });
  }

  async fetchCoinInfoByCode({ code }: { code: string }) {
    const res: any = await coinGeckoService.getCoinInfoByCode({
      coinCode: code,
      exclude: {
        localization: true,
        ticker: true,
        communityData: true,
        developerData: true,
      },
    });
    if (!res.isError) {
      return res.data;
    } else return undefined;
  }

  async fetchHistoricalMarketData() {
    const res: any = await coinGeckoService.getCoinOHCL({
      coinCode: this.coinId,
      days: this.timeInterval,
      vsCurrency: this.currencyCode,
    });
    if (!res.isError) {
      this.historicalMarketData = res.data;
    }
    return true;
  }

  get getTransactionHistoryData() {
    if (typeof this.coinMarketData === 'undefined') return undefined;

    const marketData = this.coinMarketData.market_data;
    const currentPrice = marketData.current_price.usd;
    const res = transactionHistory.map((item) => {
      const { amount, purchasePrice, fee, type } = item;
      const totalCost =
        type === 'buy'
          ? amount * purchasePrice + fee
          : type === 'sell'
          ? amount * purchasePrice - fee
          : 0;
      const totalProfitLoss =
        type === 'buy'
          ? currentPrice * amount - totalCost
          : type === 'sell'
          ? totalCost - currentPrice * amount
          : 0;
      const profitLossPercentage = totalProfitLoss / totalCost;
      return {
        ...item,
        totalCost,
        totalProfitLoss,
        profitLossPercentage,
      };
    });
    return res;
  }

  get getAssetDetail() {
    if (typeof this.coinMarketData === 'undefined') return undefined;

    const marketData = this.coinMarketData.market_data;
    const marketPrice = marketData.current_price[this.currencyCode];
    const { quantity, totalPL } = transactionHistory.reduce(
      (total: any, curr: any, index: number): any => {
        if (curr.type === 'buy')
          return {
            quantity: total.quantity + curr.amount,
            totalPL:
              total.totalPL +
              marketPrice * curr.amount -
              (curr.amount * curr.purchasePrice + curr.fee),
          };
        else if (curr.type === 'sell')
          return {
            quantity: total.quantity - curr.amount,
            totalPL:
              total.totalPL +
              (curr.amount * curr.purchasePrice - curr.fee) -
              marketPrice * curr.amount,
          };
        else return total;
      },
      { quantity: 0, totalPL: 0 },
    );
    const res = {
      coinName: portfolioData.portfolioData.crypto.find(
        (item) => item.id === this.coinId,
      )?.coinName,
      totalPrice: quantity * marketPrice,
      quantity,
      marketPrice,
      totalPL,
      PLPercentage: totalPL / (quantity * marketPrice),
      _24HChange: this.coinMarketData.market_data.price_change_24h,
      _24HChangePercentage:
        this.coinMarketData.market_data.price_change_percentage_24h,
    };

    return res;
  }

  updateTransactionHistoryData() {
    return true;
  }
}

export const cryptoVolatilityDetailStore = new CryptoVolatilityDetailStore();

const transactionHistory = [
  {
    id: 1647501595399,
    time: 1647501595399,
    type: 'buy',
    amount: 3,
    purchasePrice: 41000,
    fee: 50,
    netValue: 0,
    settings: 0,
  },
  {
    id: 1647501595310,
    time: 1647501595310,
    type: 'sell',
    amount: 1,
    purchasePrice: 50000,
    fee: 43,
    netValue: 0,
    settings: 0,
  },
  // {
  //   id: 1647501595311,
  //   time: 1647501595311,
  //   type: 'dividend',
  //   amount: 43,
  //   price: 40000,
  //   fee: 43,
  //   netValue: 0,
  //   settings: 0,
  // },
];
