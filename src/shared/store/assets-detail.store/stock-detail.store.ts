import { getCurrencyByCode } from "./../../helpers/currency-info";
import { CurrencyItem } from "./../../types/portfolio-detail.type";
import { PAStockBreadcrumbTabs } from "../../constants/portfolio-asset";
import { content } from "i18n";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { finhubService, httpService } from "services";
import { CashItem, StockItem, TransactionItem } from "shared/models";
import { rootStore } from "shared/store";
import {
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from "shared/types";
import dayjs from "dayjs";

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
  currencyCode: string = "usd";
  portfolioInfo: Portfolio | undefined = undefined;

  stockId: number = 0;
  stockDetail: StockItem | undefined = undefined;
  transactionHistory: Array<TransactionItem> | undefined = [];
  cashDetail: Array<CashItem> | undefined = [];
  currencyList: Array<CurrencyItem> | undefined = [];

  needUpdateOverviewData: boolean = false;

  timeInterval: string = "W";
  OHLC_data: Array<any> = [];
  marketData: IStockMarketData | undefined = undefined;

  selectedTab: string = PAStockBreadcrumbTabs.overview;
  isOpenAddNewTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      currencyCode: observable,
      portfolioInfo: observable,
      cashDetail: observable,
      currencyList: observable,
      stockId: observable,
      stockDetail: observable,
      transactionHistory: observable,
      timeInterval: observable,
      OHLC_data: observable,
      selectedTab: observable,
      isOpenAddNewTransactionModal: observable,
      needUpdateOverviewData: observable,
      marketData: observable,

      setOpenAddNewTransactionModal: action,
      setStockId: action,
      setTimeInterval: action,
      setCurrency: action,
      setPortfolioId: action,
      setSelectedTab: action,
      setUpdateOverviewData: action,

      resetInitialState: action,

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
    if (!this.portfolioId || !this.stockId) {
      return;
    }
    Promise.all([
      this.fetchStockDetail(),
      this.fetchStockTransactionHistory(),
      this.fetchPortfolioInfo(),
      this.fetchCash(),
    ]);
  }

  async fetchPortfolioInfo() {
    if (!this.portfolioId) {
      return;
    }

    const url = `/portfolio`;
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      const currentPortfolio = res.data.find(
        (item: Portfolio) => item.id === this.portfolioId
      );
      runInAction(() => {
        this.currencyCode = this.portfolioInfo?.initialCurrency || "usd";
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
          (item: StockItem) => item.id === this.stockId
        );
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
    return res;
  }

  async fetchCash() {
    if (!this.portfolioId || !this.stockId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.cashDetail = res.data;
        this.currencyList = res.data.map((item: CashItem) =>
          getCurrencyByCode(item.currencyCode)
        );
      });
    } else {
      runInAction(() => {
        this.cashDetail = undefined;
        this.currencyList = undefined;
      });
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
      runInAction(() => {
        this.transactionHistory = res.data;
      });
    } else {
    }
    return res;
  }

  async createNewTransaction(params: ITransactionRequest) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params
    );
    rootStore.stopLoading();
    if (!res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.default,
        "success"
      );
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      return res;
    }
  }

  async transferAssetToInvestFund(params: TransferToInvestFundType) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params
    );
    rootStore.stopLoading();
    if (!res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.transfer,
        "success"
      );
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      return res;
    }
  }

  async fetchMarketData() {
    Promise.all([
      this.fetchOHLC({
        startDate: dayjs(Date.now()).subtract(2, "year").unix(),
        endDate: dayjs(Date.now()).unix(),
        interval: "W",
      }),
    ]);
  }

  async fetchStockInfoByCode() {
    if (!this.stockDetail || !this.stockDetail?.stockCode) {
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
    return res;
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
      const datetime = res.data["t"];
      if (typeof datetime === "undefined" || datetime === null) return false;
      const open = res.data["o"];
      const close = res.data["c"];
      const high = res.data["h"];
      const low = res.data["l"];
      runInAction(() => {
        this.OHLC_data = datetime?.map((item: number, index: number) => {
          return [item, open[index], high[index], low[index], close[index]];
        });
      });
      return res;
    } else {
    }
    return res;
  }

  resetInitialState() {
    runInAction(() => {
      this.portfolioInfo = undefined;
      this.cashDetail = undefined;
      this.currencyList = undefined;

      this.stockDetail = undefined;
      this.transactionHistory = undefined;

      this.OHLC_data = [];
      this.marketData = undefined;

      this.isOpenAddNewTransactionModal = false;
      this.needUpdateOverviewData = true;
      this.selectedTab = PAStockBreadcrumbTabs.overview;
    });
  }
}

export const stockDetailStore = new StockDetailStore();
