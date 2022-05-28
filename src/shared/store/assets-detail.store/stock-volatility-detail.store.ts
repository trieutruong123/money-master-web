import { PAStockBreadcrumbTabs } from './../../constants/portfolio-asset';
import { StockTransactionList } from './../../models/insight-chart.model';
import { content } from 'i18n';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { finhubService, httpService } from 'services';
import { StockItem } from 'shared/models';
import { rootStore } from 'shared/store';
import { portfolioData } from 'shared/store/portfolio/portfolio-data';
import { NewTransactionRequestBody, Portfolio } from 'shared/types';
import dayjs from 'dayjs';

class StockVolatilityDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  stockId: number = 0;
  stockCode: string = '';
  portfolioId: number = 0;
  stockName: string | undefined = '';
  currencyCode: string = 'usd';
  timeInterval: string = 'W';
  selectedTab: string = PAStockBreadcrumbTabs.overview;
  historicalMarketData: Array<any> = [];
  stockDetail: StockItem | undefined = undefined;
  stockList: Array<StockItem> | undefined = undefined;
  transactionList: StockTransactionList | undefined = [];
  portfolioInfo: Portfolio | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      historicalMarketData: observable,
      timeInterval: observable,
      stockName: observable,
      selectedTab: observable,
      portfolioInfo: observable,
      transactionList: observable,
      currencyCode: observable,
      portfolioId: observable,

      setOpenAddNewTransactionModal: action,
      setStockId: action,
      setTimeInterval: action,
      setCurrency: action,
      setPortfolioId: action,
      setStockCode: action,
      setSelectedTab: action,

      fetchStockDetail: action,
      fetchHistoricalMarketData: action,
      fetchStockTransactionList: action,
      fetchPortfolioInfo: action,
      fetchStockInfoByCode: action,

      createNewTransaction: action,
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

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  setStockCode(stockCode: string) {
    this.stockCode = stockCode;
  }

  async fetchData() {
    Promise.all([
      await this.fetchStockDetail(),
      await this.fetchStockTransactionList(),
      await this.fetchPortfolioInfo(),
    ]);
  }

  async fetchFinhubService() {
    Promise.all([
      await this.fetchStockInfoByCode(),
      await this.fetchHistoricalMarketData({
        startDate: dayjs(Date.now()).subtract(2, 'year').unix(),
        endDate: dayjs(Date.now()).unix(),
        interval: 'W',
      }),
    ]);
  }

  async fetchPortfolioInfo() {
    if (!this.portfolioId) {
      return;
    }
    const url = `/portfolio`;
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      const currentPortfolio = res.data.map(
        (item: Portfolio) => item.id === this.portfolioId,
      );
      this.portfolioInfo = currentPortfolio;
      this.currencyCode = this.portfolioInfo?.initialCurrency || 'usd';
    } else {
    }
  }

  async fetchStockDetail() {
    if (!this.portfolioId || !this.stockId) {
      return;
    }
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

  async fetchStockTransactionList() {
    if (!this.portfolioId || !this.stockId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/stock/${this.stockId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.transactionList = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
  }

  async fetchStockInfoByCode() {
    if (!this.stockCode) {
      return;
    }
    const res: any = await finhubService.getStockInfoByCode({
      symbol: this.stockCode,
    });
    if (!res.isError) {
      return res.data;
    } else return undefined;
  }

  async fetchHistoricalMarketData(params: any) {
    if (!this.stockCode) {
      return;
    }
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

  async createNewTransaction(params: NewTransactionRequestBody) {
    const url = `/portfolio/${this.portfolioId}/stock/${this.stockCode}/transaction`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );

    if (!res.isError) {
      this.transactionList?.push(res.data);
    } else {
      rootStore.raiseError(content[rootStore.locale].error.badRequest);
    }
  }
}

export const stockVolatilityDetailStore = new StockVolatilityDetailStore();
