import { PAStockBreadcrumbTabs } from '../../constants/portfolio-asset';
import {
  StockTransactionList,
  TransactionItem,
} from '../../models/insight-chart.model';
import { content } from 'i18n';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { finhubService, httpService } from 'services';
import { StockItem } from 'shared/models';
import { rootStore } from 'shared/store';
import {
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from 'shared/types';
import dayjs from 'dayjs';

interface IStockMarketData {
  c: number;
  dp: number;
  d: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

class StockDetailStore {
  portfolioId: number = 0;
  currencyCode: string = 'usd';
  portfolioInfo: Portfolio | undefined = undefined;

  stockId: number = 0;
  stockDetail: StockItem | undefined = undefined;
  transactionHistory: Array<TransactionItem> | undefined = [];

  needUpdateOverviewData: boolean = true;

  timeInterval: string = 'W';
  OHLC_data: Array<any> = [];
  marketData: IStockMarketData | undefined = undefined;

  selectedTab: string = PAStockBreadcrumbTabs.overview;
  isOpenAddNewTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      currencyCode: observable,
      portfolioInfo: observable,
      stockId: observable,
      stockDetail: observable,
      transactionHistory: observable,
      timeInterval: observable,
      OHLC_data: observable,
      selectedTab: observable,
      isOpenAddNewTransactionModal: observable,
      needUpdateOverviewData: observable,

      setOpenAddNewTransactionModal: action,
      setStockId: action,
      setTimeInterval: action,
      setCurrency: action,
      setPortfolioId: action,
      setSelectedTab: action,

      fetchStockDetail: action,
      fetchOHLC: action,
      fetchStockTransactionHistory: action,
      fetchPortfolioInfo: action,
      fetchStockInfoByCode: action,

      createNewTransaction: action,
    });
  }

  setUpdateOverviewData(isUpdate: boolean) {
    this.needUpdateOverviewData = isUpdate;
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

  async fetchOverviewTabData() {
    Promise.all([
      await this.fetchStockDetail(),
      await this.fetchStockTransactionHistory(),
      await this.fetchPortfolioInfo(),
    ]);
    if (this.marketData === undefined) {
      await this.fetchStockInfoByCode();
    }
  }

  async fetchPortfolioInfo() {
    if (!this.portfolioId) {
      return;
    }

    const url = `/portfolio`;
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      const currentPortfolio = res.data.find(
        (item: Portfolio) => item.id === this.portfolioId,
      );
      runInAction(() => {
        this.currencyCode = this.portfolioInfo?.initialCurrency || 'usd';
        this.portfolioInfo = currentPortfolio;
      });
    } else {
      runInAction(() => {
        this.portfolioInfo = undefined;
      });
    }
  }

  async fetchStockDetail() {
    if (!this.portfolioId || !this.stockId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.stockDetail = res.data.find(
          (item: StockItem) => item.id === this.stockId,
        );
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
    return res;
  }

  async fetchStockTransactionHistory() {
    if (!this.portfolioId || !this.stockId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/stock/${this.stockId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      console.log(res.data);
      runInAction(() => {
        this.transactionHistory = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
    return res;
  }

  async createNewTransaction(params: ITransactionRequest) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/stock/${this.stockDetail?.stockCode}/transaction`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.badRequest);
      return res;
    }
  }

  async transferAssetToInvestFund(params: TransferToInvestFundType) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/fund`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.transfer,
        'success',
      );
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      return res;
    }
  }
  async fetchMarketData() {
    Promise.all([
      await this.fetchOHLC({
        startDate: dayjs(Date.now()).subtract(2, 'year').unix(),
        endDate: dayjs(Date.now()).unix(),
        interval: 'W',
      }),
    ]);
  }

  async fetchStockInfoByCode() {
    if (!this.stockDetail?.stockCode) {
      return;
    }
    const res: any = await finhubService.getStockInfoByCode({
      symbol: this.stockDetail.stockCode,
    });
    if (!res.isError) {
      runInAction(() => {
        this.marketData = res.data;
      });
    } else {
      runInAction(() => {
        this.marketData = undefined;
      });
    }
  }

  async fetchOHLC(params: any) {
    if (!this.stockDetail?.stockCode) {
      return;
    }
    const res: any = await finhubService.getStockOHCL({
      stockId: this.stockDetail.stockCode,
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
      runInAction(() => {
        this.OHLC_data = datetime?.map((item: number, index: number) => {
          return [item, open[index], high[index], low[index], close[index]];
        });
      });
      return res;
    }
    return res;
  }
}

export const stockDetailStore = new StockDetailStore();
