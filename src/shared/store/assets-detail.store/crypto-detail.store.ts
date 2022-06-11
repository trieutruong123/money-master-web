import { coinGeckoService, httpService } from "services";
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { content } from "i18n";
import { rootStore } from "shared/store";
import { CashItem, CryptoItem, TransactionItem } from "shared/models";
import { portfolioData } from "../portfolio/portfolio-data";
import {
  CurrencyItem,
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from "shared/types";
import { PACryptoBreadcrumbTabs } from "shared/constants";
import { getCurrencyByCode } from "shared/helpers";

interface ICryptoMarketData {
  c: number;
  dp: number;
  d: number;
  h: number;
  l: number;
}

class CryptoDetailStore {
  portfolioId: number = 0;
  currencyCode: string = "usd";
  portfolioInfo: Portfolio | undefined = undefined;

  cryptoId: number = 0;
  cryptoDetail: CryptoItem | undefined = undefined;
  transactionHistory: Array<TransactionItem> | undefined = [];
  cashDetail: Array<CashItem> | undefined = [];
  currencyList: Array<CurrencyItem> | undefined = [];

  needUpdateOverviewData: boolean = true;

  timeInterval: string = "1";
  OHLC_data: Array<any> = [];
  marketData: ICryptoMarketData | undefined = undefined;

  selectedTab: string = PACryptoBreadcrumbTabs.overview;
  isOpenAddNewTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      currencyCode: observable,
      portfolioInfo: observable,
      cryptoId: observable,
      cryptoDetail: observable,
      cashDetail: observable,
      currencyList: observable,
      transactionHistory: observable,
      timeInterval: observable,
      OHLC_data: observable,
      selectedTab: observable,
      isOpenAddNewTransactionModal: observable,
      needUpdateOverviewData: observable,

      setCryptoId: action,
      setCurrency: action,
      setOpenAddNewTransactionModal: action,
      setTimeInterval: action,
      setPortfolioId: action,
      setSelectedTab: action,
      setUpdateOverviewData: action,

      fetchCryptoDetail: action,
      fetchOHLC: action,
      fetchCryptoTransactionHistory: action,
      fetchPortfolioInfo: action,
      fetchCryptoInfoByCode: action,

      resetInitialState: action,

      createNewTransaction: action,
    });
  }

  setCryptoId(cryptoId: string) {
    this.cryptoId = Number.parseInt(cryptoId);
  }

  setPortfolioId(portfolioId: string) {
    this.portfolioId = Number.parseInt(portfolioId);
  }

  setTimeInterval(interval: string) {
    this.timeInterval = interval;
  }

  setCurrency(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setUpdateOverviewData(isUpdate: boolean) {
    this.needUpdateOverviewData = isUpdate;
  }

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  async fetchOverviewTabData() {
    Promise.all([
      this.fetchCryptoDetail(),
      this.fetchCryptoTransactionHistory(),
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

  async fetchCash() {
    if (!this.portfolioId || !this.cryptoId) {
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
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
      runInAction(() => {
        this.cashDetail = undefined;
        this.currencyList = undefined;
      });
    }
  }

  async fetchCryptoDetail() {
    if (!this.portfolioId || !this.cryptoId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.cryptoDetail = res.data.find(
          (item: CryptoItem) => item.id === this.cryptoId
        );
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
    return res;
  }

  async fetchCryptoTransactionHistory() {
    if (!this.portfolioId || !this.cryptoId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/crypto/${this.cryptoId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.transactionHistory = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
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
    Promise.all([this.fetchOHLC()]);
  }

  async fetchCryptoInfoByCode() {
    if (!this.cryptoDetail || !this.cryptoDetail?.cryptoCoinCode) {
      return;
    }
    const res: any = await coinGeckoService.getCoinInfoByCode({
      coinCode: this.cryptoDetail?.cryptoCoinCode,
      exclude: {
        localization: true,
        ticker: true,
        communityData: true,
        developerData: true,
      },
    });
    if (!res.isError) {
      const marketData = res.data.market_data;
      const h = marketData.high_24h.usd;
      const l = marketData.low_24h.usd;
      const c = marketData.current_price.usd;
      const d = marketData.price_change_24h;
      const dp = marketData.price_change_24h / c;
      const pc = marketData.price_change_24h;
      runInAction(() => {
        this.marketData = { h, l, c, d, dp };
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
      runInAction(() => {
        this.marketData = undefined;
      });
    }
  }

  async fetchOHLC() {
    if (!this.cryptoDetail?.cryptoCoinCode) {
      return;
    }
    const res: any = await coinGeckoService.getCoinOHCL({
      coinCode: this.cryptoDetail.cryptoCoinCode,
      days: this.timeInterval,
      vsCurrency: this.currencyCode,
    });
    if (!res.isError) {
      runInAction(() => {
        this.OHLC_data = res.data;
      });
      return res;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
    return res;
  }

  resetInitialState() {
    runInAction(() => {
      this.portfolioInfo = undefined;
      this.cashDetail = undefined;
      this.currencyList = undefined;

      this.cryptoDetail = undefined;
      this.transactionHistory = undefined;

      this.OHLC_data = [];
      this.marketData = undefined;

      this.isOpenAddNewTransactionModal = false;
      this.needUpdateOverviewData = true;
      this.selectedTab = PACryptoBreadcrumbTabs.overview;
    });
  }
}

export const cryptoDetailStore = new CryptoDetailStore();
