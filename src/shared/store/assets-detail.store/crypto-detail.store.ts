import { coinGeckoService, fcsapiService, httpService } from 'services';
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import { content } from 'i18n';
import { rootStore } from 'shared/store';
import { CashItem, CryptoItem, TransactionItem } from 'shared/models';
import { portfolioData } from '../portfolio/portfolio-data';
import {
  CurrencyItem,
  ITransactionListRequest,
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from 'shared/types';
import {
  PACryptoBreadcrumbTabs,
  TransactionHistoryContants,
} from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';
import { convertUTCToLocalTimeZone2 } from 'utils/time';
import dayjs from 'dayjs';

interface ICryptoMarketData {
  c: number;
  dp: number;
  d: number;
  h: number;
  l: number;
}

class CryptoDetailStore {
  portfolioId: number = 0;
  currencyCode: string = 'usd';
  portfolioInfo: Portfolio | undefined = undefined;

  cryptoId: number = 0;
  cryptoProfile: any;
  cryptoDetail: CryptoItem | undefined = undefined;
  cashDetail: Array<CashItem> | undefined = [];
  currencyList: Array<CurrencyItem> | undefined = [];

  needUpdateOverviewData: boolean = true;

  transactionHistory: Array<TransactionItem> | undefined = undefined;
  transactionSelection: {
    type: 'all' | 'in' | 'out';
    startDate: Date | null;
    endDate: Date | null;
  } = { type: 'all', startDate: null, endDate: null };

  timeInterval: string = '1';
  OHLC_data: Array<any> = [];
  marketData: ICryptoMarketData | undefined = undefined;

  selectedTab: string = PACryptoBreadcrumbTabs.overview;
  isOpenAddNewTransactionModal: boolean = false;

  currentPage: number = 1;

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
      cryptoProfile: observable,
      transactionSelection: observable,
      currentPage: observable,

      setCryptoId: action,
      setCurrency: action,
      setOpenAddNewTransactionModal: action,
      setTimeInterval: action,
      setPortfolioId: action,
      setSelectedTab: action,
      setUpdateOverviewData: action,
      setSelectedTransaction: action,
      setCurrentPage: action,
      setTransactionHistory: action,

      fetchCryptoDetail: action,
      fetchCryptoProfile: action,
      fetchOHLC: action,
      fetchTransactionHistoryData: action,

      fetchPortfolioInfo: action,
      fetchCryptoInfoByCode: action,

      resetInitialState: action,

      createNewTransaction: action,
    });
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  setSelectedTransaction(key: string, value: any) {
    this.transactionSelection = {
      ...this.transactionSelection,
      [key]: value,
    };
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

  setTransactionHistory(history: TransactionItem[]) {
    this.transactionHistory = history;
  }

  async fetchOverviewTabData() {
    Promise.all([
      this.fetchCryptoDetail(),
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
          getCurrencyByCode(item.currencyCode),
        );
      });
    } else {
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
          (item: CryptoItem) => item.id === this.cryptoId,
        );
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
    return res;
  }

  async fetchTransactionHistoryData({
    itemsPerPage,
    nextPage,
    startDate,
    endDate,
    type,
  }: ITransactionListRequest) {
    if (!this.portfolioId || !this.cryptoId) {
      return;
    }
    let params: any = {
      PageSize: itemsPerPage,
      PageNumber: nextPage,
      Type: type,
    };
    if (endDate) params.EndDate = endDate;
    if (startDate) params.StartDate = startDate;

    const url = `/portfolio/${this.portfolioId}/crypto/${this.cryptoId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(
      url,
      params,
    );
    if (!res.isError) {
      return res.data;
    } else {
      return [];
    }
  }

  async createNewTransaction(params: ITransactionRequest) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.default,
        'success',
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
      return res;
    }
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
      this.currentPage = 1;
      this.transactionSelection = {
        startDate: null,
        endDate: null,
        type: 'all',
      };
    });
  }

  async resetTransaction() {
    const data = await this.fetchTransactionHistoryData({
      itemsPerPage: 3 * TransactionHistoryContants.itemsPerPage,
      nextPage: 1,
      type: 'all',
      startDate: null,
      endDate: null,
    });
    this.setTransactionHistory(data);
    this.setCurrentPage(1);
    this.setSelectedTransaction('type', 'all');
    this.setSelectedTransaction('startDate', null);
    this.setSelectedTransaction('endDate', null);
  }

  async refreshTransactionHistory() {
    const startDate = this.transactionSelection.startDate
      ? dayjs(this.transactionSelection.startDate).startOf('day').format()
      : null;
    const endDate = this.transactionSelection.endDate
      ? dayjs(this.transactionSelection.endDate).endOf('day').format()
      : null;
    const data = await this.fetchTransactionHistoryData({
      itemsPerPage: 3 * TransactionHistoryContants.itemsPerPage,
      nextPage: 1,
      type: this.transactionSelection.type,
      startDate: startDate,
      endDate: endDate,
    });
    this.setTransactionHistory(data);
    this.setCurrentPage(1);
  }

  async fetchCryptoProfile() {
    if (!this.cryptoDetail?.cryptoCoinCode) {
      return;
    }
    const res: any = await fcsapiService.getCryptoProfile(
      this.cryptoDetail?.cryptoCoinCode,
    );
    if (!res.isError) {
      runInAction(() => {
        this.cryptoProfile = res.data.response[0];
      });
    } else {
      runInAction(() => {
        this.cryptoProfile = undefined;
      });
    }
    return res;
  }
}

export const cryptoDetailStore = new CryptoDetailStore();
