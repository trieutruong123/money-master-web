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
    this.stockMarketData = await this.fetchCoinInfoByCode({ stockId });
  }

  async fetchCoinInfoByCode({ stockId }: { stockId: string }) {
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
    return true;
  }

  get getStockDetail() {
    if (typeof this.stockMarketData === 'undefined') return undefined;

    // const res = {
    //   coinName: portfolioData.portfolioData.stocks.find(
    //     (item) => item.id === this.stockId,
    //   )?.description,
    //   totalPrice: quantity * marketPrice,
    //   quantity,
    //   marketPrice,
    //   totalPL,
    //   PLPercentage: totalPL / (quantity * marketPrice),
    //   _24HChange: this.coinMarketData.market_data.price_change_24h,
    //   _24HChangePercentage:
    //     this.coinMarketData.market_data.price_change_percentage_24h,
    // };
    return;
  }

  updateTransactionHistoryData() {}
}

export const stockVolatilityDetailStore = new StockVolatilityDetailStore();
