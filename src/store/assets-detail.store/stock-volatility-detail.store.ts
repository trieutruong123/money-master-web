import { action, computed, makeAutoObservable, observable } from 'mobx';
import { finhubService } from 'services';
import { portfolioData } from 'store/portfolio-detail.store';

class StockVolatilityDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  historicalMarketData: Array<any> = [];
  stockId: string = '';
  stockMarketData: any = undefined;
  currencyCode: string = 'usd';
  timeInterval: string = 'W';
  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      historicalMarketData: observable,
      timeInterval: observable,

      setOpenAddNewTransactionModal: action,
      setStockId: action,
      setTimeInterval: action,
      fetchData: action,
      fetchHistoricalMarketData: action,

      getTransactionHistoryData: computed,
      getStockDetail: computed,
    });
  }

  setTimeInterval(interval: string) {
    this.timeInterval = interval;
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setStockId(stockId: string) {
    this.stockId = stockId;
  }

  setCurrency(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  async fetchData({ stockId }: { stockId: string }) {
    this.stockMarketData = await this.fetchStockInfoByCode({ stockId });
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
      stockId: this.stockId,
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
    if (typeof this.stockMarketData === 'undefined') return undefined;

    const marketPrice = this.stockMarketData.c;
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

  get getStockDetail() {
    if (typeof this.stockMarketData === 'undefined') return undefined;
    const marketPrice = this.stockMarketData.c;
    
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
      stockName: portfolioData.portfolioData.stocks.find(
        (item) => item.id === this.stockId,
      )?.description,
      totalPrice: quantity * marketPrice,
      quantity,
      marketPrice,
      totalPL,
      PLPercentage: totalPL / (quantity * marketPrice),
      _24HChange: this.stockMarketData.dp,
      _24HChangePercentage:
        this.stockMarketData.pc,
    };
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
