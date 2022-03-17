import { coinGeckoService } from 'services';
import { action, makeAutoObservable, observable } from 'mobx';
import { portfolioData } from '../portfolio-detail.store';
class CryptoVolatilityDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  transactionHistoryData: Array<any> = [];
  historicalMarketData: Array<any> = [];
  coinId: string = '';
  coinMarketData: any = undefined;
  coinDetail: any = undefined;
  timeInterval: number = 1;
  currencyCode: string = 'usd';

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      transactionHistoryData: observable,
      historicalMarketData: observable,
      coinId: observable,
      coinDetail: observable,
      setOpenAddNewTransactionModal: action,
      fetchData: action,
      fetchHistoricalMarketData: action,
      setCoinId: action,
      setTimeInterval: action,
      setCurrency: action,
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
  async fetchData() {
    this.coinDetail = portfolioData.portfolioData.crypto.find(
      (item) => item.id === this.coinId,
    );
    this.coinMarketData = await this.fetchCoinInfoByCode({ code: this.coinId });

    console.log(this.coinId);
    console.log(this.coinDetail);
    console.log(this.coinMarketData);
    return true;
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

  async fetchCoinInfoByCode({ code }: { code: string }) {
    if (code !== '' || code !== undefined) {
      const res: any = await coinGeckoService.getCoinInfoByCode({
        coinCode: code,
        exclude: {
          localization: true,
          ticker: true,
          communityData: true,
          developerData: true,
        },
      });
      if (!res.isError) return res.data;
      else return undefined;
    }
  }

  updateTransactionHistoryData() {
    return true;
  }
}

export const cryptoVolatilityDetailStore = new CryptoVolatilityDetailStore();
