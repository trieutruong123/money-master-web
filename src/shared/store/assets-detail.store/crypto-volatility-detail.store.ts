import { coinGeckoService, httpService } from 'services';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { content } from 'i18n';
import { rootStore } from 'shared/store';
import { CryptoItem } from 'shared/models';
import { portfolioData } from '../portfolio/portfolio-data';

class CryptoVolatilityDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  //transactionHistoryData: Array<any> = [];
  coinId: number = 0;
  coinCode: string = '';
  portfolioId: number = 0;
  cryptoName: string | undefined = '';
  timeInterval: number = 1;
  currencyCode: string = 'usd';
  cryptoDetail: CryptoItem | undefined = undefined;
  cryptoList: Array<CryptoItem> | undefined = undefined;
  historicalMarketData: Array<any> = [];
  //coinDetail: any | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      coinId: observable,
      coinCode: observable,
      portfolioId: observable,
      cryptoName: observable,
      timeInterval: observable,
      currencyCode: observable,
      cryptoDetail: observable,
      historicalMarketData: observable,

      setCoinId: action,
      setCoinCode: action,
      setCurrency: action,
      setOpenAddNewTransactionModal: action,
      setTimeInterval: action,
      setPortfolioId: action,
      fetchCoinDetail: action,
      fetchHistoricalMarketData: action,

      getTransactionHistoryData: computed,
    });
  }

  setCoinId(id: string) {
    this.coinId = Number.parseInt(id);
  }

  setCoinCode(code: string) {
    this.coinCode = code;
  }

  setPortfolioId(portfolioId: string) {
    this.portfolioId = Number.parseInt(portfolioId);
  }

  setTimeInterval(interval: number) {
    this.timeInterval = interval;
  }

  setCurrency(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
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
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
  }

  async fetchHistoricalMarketData() {
    const res: any = await coinGeckoService.getCoinOHCL({
      coinCode: this.coinCode,
      days: this.timeInterval,
      vsCurrency: this.currencyCode,
    });
    if (!res.isError) {
      this.historicalMarketData = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
  }

  async fetchCoinDetail() {
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cryptoList = res.data;
      this.cryptoDetail = res.data.find((item: any) => item.id === this.coinId);
      this.cryptoName = res.data.find(
        (item: any) => item.id === this.coinId,
      )?.name;
      this.coinCode = res.data.find(
        (item: any) => item.id === this.coinId,
      ).cryptoCoinCode;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cryptoDetail = undefined;
      this.cryptoList = undefined;
    }
  }

  get getTransactionHistoryData() {
    if (typeof this.cryptoDetail === 'undefined') return undefined;

    const currentPrice = this.cryptoDetail?.currentPrice;
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
