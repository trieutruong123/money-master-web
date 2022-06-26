import dayjs from 'dayjs';
import { content } from 'i18n';
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import { httpService } from 'services';
import { TransactionHistoryContants } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';
import {
  CashItem,
  CustomAssetItem,
  CustomAssetItemByCategory,
  ProfitLossItem,
  TransactionItem,
} from 'shared/models';
import {
  CurrencyItem,
  ITransactionListRequest,
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from 'shared/types';
import { rootStore } from '../root.store';

class CustomAssetDetailStore {
  portfolioId: number = 0;
  currencyCode: string = 'usd';
  portfolioInfo: Portfolio | undefined = undefined;

  categoryInfo: CustomAssetItemByCategory | undefined = undefined;
  customAssetId: number = 0;
  customAssetDetail: CustomAssetItem | undefined = undefined;

  transactionHistory: Array<TransactionItem> | undefined = undefined;
  transactionSelection: {
    type: 'all' | 'in' | 'out';
    startDate: Date | null;
    endDate: Date | null;
  } = { type: 'all', startDate: null, endDate: null };
  currentPage: number = 1;

  profitLossList: Array<ProfitLossItem> = [];
  profitLossSelection: {
    period: 'day' | 'month' | 'year';
    type: 'bar' | 'line';
  } = { period: 'day', type: 'bar' };

  cashDetail: Array<CashItem> | undefined = [];
  currencyList: Array<CurrencyItem> | undefined = [];
  needUpdateOverviewData: boolean = true;
  isOpenAddNewTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      currencyCode: observable,
      portfolioInfo: observable,

      customAssetId: observable,
      customAssetDetail: observable,
      transactionHistory: observable,
      cashDetail: observable,
      currencyList: observable,
      needUpdateOverviewData: observable,
      isOpenAddNewTransactionModal: observable,
      transactionSelection: observable,
      currentPage: observable,
      profitLossList: observable,
      profitLossSelection: observable,

      setPortfolioId: action,
      setCustomAssetId: action,
      setOpenAddNewTransactionModal: action,
      setCurrency: action,
      setUpdateOverviewData: action,
      setTransactionHistory: action,
      setSelectedTransaction: action,
      setCurrentPage: action,
      setProfitLossSelection: action,

      resetInitialState: action,

      fetchCash: action,
      fetchPortfolioInfo: action,
      fetchTransactionHistoryData: action,
      fetchCustomAssetProfitLoss: action,
    });
  }

  setSelectedTransaction(key: string, value: any) {
    this.transactionSelection = {
      ...this.transactionSelection,
      [key]: value,
    };
  }

  setProfitLossSelection(key: string, value: any) {
    this.profitLossSelection = { ...this.profitLossSelection, [key]: value };
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  setTransactionHistory(history: TransactionItem[]) {
    this.transactionHistory = history;
  }

  setPortfolioId(portfolioId: string) {
    this.portfolioId = Number.parseFloat(portfolioId);
  }

  setCustomAssetId(assetId: string) {
    this.customAssetId = Number.parseFloat(assetId);
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setCurrency(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  setUpdateOverviewData(isUpdate: boolean) {
    this.needUpdateOverviewData = isUpdate;
  }

  async fetchOverviewTabData() {
    Promise.all([
      this.fetchPortfolioInfo(),
      this.fetchCustomAssetDetail(),
      this.fetchCash(),
    ]);
  }

  async fetchPortfolioInfo() {
    if (!this.portfolioId || !this.customAssetId) {
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

  async fetchCustomAssetProfitLoss() {
    if (!this.portfolioId || !this.customAssetId) {
      return;
    }
    const params = { Period: this.profitLossSelection.period };
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/custom/${this.customAssetId}/profitLoss`;
    const res: { isError: boolean; data: any } = await httpService.get(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      runInAction(() => {
        this.profitLossList = res.data;
      });
    } else {
    }
    return res;
  }

  async fetchCustomAssetDetail() {
    if (!this.portfolioId || !this.customAssetId) {
      return;
    }

    const url = `/portfolio/${this.portfolioId}/custom`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.categoryInfo = res.data.find(
          (categoryInfo: CustomAssetItemByCategory) =>
            categoryInfo.assets.some((item) => item.id === this.customAssetId),
        );
        this.customAssetDetail = this.categoryInfo?.assets.find(
          (item) => item.id === this.customAssetId,
        );
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
    return res;
  }

  async fetchCash() {
    if (!this.portfolioId || !this.customAssetId) {
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
    return res;
  }

  async fetchTransactionHistoryData({
    itemsPerPage,
    nextPage,
    startDate,
    endDate,
    type,
  }: ITransactionListRequest) {
    if (!this.portfolioId || !this.customAssetId) {
      return;
    }
    let params: any = {
      PageSize: itemsPerPage,
      PageNumber: nextPage,
      Type: type,
    };
    if (endDate) params.EndDate = endDate;
    if (startDate) params.StartDate = startDate;

    const url = `/portfolio/${this.portfolioId}/custom/${this.customAssetId}/transactions`;
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

  resetTransactionSelection() {
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

  resetInitialState() {
    runInAction(() => {
      this.portfolioInfo = undefined;
      this.cashDetail = undefined;
      this.currencyList = undefined;

      this.customAssetDetail = undefined;
      this.categoryInfo = undefined;

      this.transactionHistory = undefined;

      this.isOpenAddNewTransactionModal = false;
      this.needUpdateOverviewData = true;

      this.profitLossSelection = {
        period: 'day',
        type: 'bar',
      };

      this.currentPage = 1;
      this.transactionSelection = {
        startDate: null,
        endDate: null,
        type: 'all',
      };
    });
  }
}

export const customAssetsDetailStore = new CustomAssetDetailStore();
