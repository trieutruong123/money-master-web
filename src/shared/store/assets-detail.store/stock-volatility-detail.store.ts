import { content } from 'i18n';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { finhubService, httpService } from 'services';
import { StockItem } from 'shared/models';
import { rootStore } from 'shared/store';
import { portfolioData } from 'shared/store/portfolio/portfolio-data';

class StockVolatilityDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  stockId: number = 0;
  stockCode: string = '';
  portfolioId: number = 0;
  stockName: string | undefined = '';
  currencyCode: string = 'usd';
  timeInterval: string = 'W';
  historicalMarketData: Array<any> = [];
  stockDetail: StockItem | undefined = undefined;
  stockList: Array<StockItem> | undefined = undefined;
  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      historicalMarketData: observable,
      timeInterval: observable,
      stockName: observable,

      setOpenAddNewTransactionModal: action,
      setStockId: action,
      setTimeInterval: action,
      setCurrency: action,
      setPortfolioId: action,
      setStockCode: action,
      fetchStockDetail: action,
      fetchHistoricalMarketData: action,

      getTransactionHistoryData: computed,
    });
  }

  setTimeInterval(interval: string) {
    this.timeInterval = interval;
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setStockId(stockId: string) {
    this.stockId = Number.parseInt(stockId);
  }

  setPortfolioId(portfolioId: string) {
    this.portfolioId = Number.parseInt(portfolioId);
  }

  setCurrency(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  setStockCode(stockCode: string) {
    this.stockCode = stockCode;
  }

  async fetchStockDetail({ stockId }: { stockId: string }) {
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.stockList = res.data;
      this.stockDetail = res.data.find((item: any) => item.id === this.stockId);
      this.stockName = res.data.find(
        (item: any) => item.id === this.stockId,
      )?.name;
      this.stockCode = res.data.find(
        (item: any) => item.id === this.stockId,
      ).stockCode;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.stockDetail = undefined;
      this.stockList = undefined;
    }
  }

  async fetchStockInfoByCode({ stockId }: { stockId: string }) {
    const res: any = await finhubService.getStockInfoByCode({
      symbol: stockId,
    });
    if (!res.isError) {
      return res.data;
    } else return undefined;
  }

  async fetchHistoricalMarketData(params: any) {
    const res: any = await finhubService.getStockOHCL({
      stockId: this.stockCode,
      resolution: params.interval,
      startDate: params.startDate,
      endDate: params.endDate,
    });
    if (!res.isError) {
      const datetime = res.data['t'];
      if (typeof datetime === 'undefined' || datetime === null) return false;
      const open = res.data['o'];
      const close = res.data['c'];
      const high = res.data['h'];
      const low = res.data['l'];
      this.historicalMarketData = datetime?.map(
        (item: number, index: number) => {
          return [item, open[index], high[index], low[index], close[index]];
        },
      );
      return true;
    }
    return true;
  }

  get getTransactionHistoryData() {
    if (typeof this.stockDetail === 'undefined') return undefined;

    const marketPrice = this.stockDetail?.currentPrice;
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
          ? marketPrice * amount - totalCost
          : type === 'sell'
          ? totalCost - marketPrice * amount
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

  updateTransactionHistoryData() {}
}

export const stockVolatilityDetailStore = new StockVolatilityDetailStore();

const transactionHistory = [
  {
    id: 1647501595399,
    time: 1647501595399,
    type: 'buy',
    amount: 3,
    purchasePrice: 178.96,
    fee: 1,
    netValue: 0,
    settings: 0,
  },
  {
    id: 1647501595310,
    time: 1647501595310,
    type: 'sell',
    amount: 1,
    purchasePrice: 180.96,
    fee: 1,
    netValue: 0,
    settings: 0,
  },
];
