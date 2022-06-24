import { rootStore } from 'shared/store';
import { getCurrencyByCode, httpError } from 'shared/helpers';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { httpService } from 'services';
import { CashItem, RealEstateItem, TransactionItem } from 'shared/models';
import { content } from 'i18n';
import {
  AssetTypeName,
  TransactionHistoryContants,
  TransactionTypeName,
} from 'shared/constants';
import {
  CurrencyItem,
  ITransactionListRequest,
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from 'shared/types';
import dayjs from 'dayjs';

class RealEstateDetailStore {
  portfolioId: number = 0;
  currencyCode: string = 'usd';
  portfolioInfo: Portfolio | undefined = undefined;

  realEstateName: string | undefined = '';
  assetId: number = 0;
  assetDetail: RealEstateItem | undefined = undefined;

  transactionHistory: Array<TransactionItem> | undefined = undefined;
  transactionSelection: {
    type: 'all' | 'in' | 'out';
    startDate: Date | null;
    endDate: Date | null;
  } = { type: 'all', startDate: null, endDate: null };
  currentPage: number = 1;

  cashDetail: Array<CashItem> | undefined = [];
  currencyList: Array<CurrencyItem> | undefined = [];
  needUpdateOverviewData: boolean = true;
  isOpenAddNewTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      currencyCode: observable,
      portfolioInfo: observable,

      assetId: observable,
      assetDetail: observable,
      realEstateName: observable,
      transactionHistory: observable,
      cashDetail: observable,
      currencyList: observable,
      needUpdateOverviewData: observable,
      isOpenAddNewTransactionModal: observable,
      transactionSelection: observable,
      currentPage: observable,

      setPortfolioId: action,
      setOpenAddNewTransactionModal: action,
      setCurrency: action,
      setAssetId: action,
      setUpdateOverviewData: action,
      setTransactionHistory: action,
      setSelectedTransaction: action,
      setCurrentPage: action,

      fetchRealEstateDetail: action,
      fetchTransactionHistoryData: action,
      fetchPortfolioInfo: action,
      fetchCash: action,

      resetInitialState: action,

      createNewTransaction: action,
      transferAssetToInvestFund: action,
    });
  }

  setSelectedTransaction(key: string, value: any) {
    this.transactionSelection = {
      ...this.transactionSelection,
      [key]: value,
    };
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

  setAssetId(assetId: string) {
    this.assetId = Number.parseFloat(assetId);
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

  async fetchOverviewData() {
    Promise.all([
      this.fetchPortfolioInfo(),
      this.fetchCash(),
      this.fetchRealEstateDetail(),
    ]);
  }

  async fetchPortfolioInfo() {
    if (!this.portfolioId || !this.assetId) {
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
    return res;
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
        content[rootStore.locale].success.default,
        'success',
      );
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      return res;
    }
  }

  async fetchRealEstateDetail() {
    const url = `/portfolio/${this.portfolioId}/${AssetTypeName.realEstate}`;
    const res: any = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.assetDetail = res.data.find(
          (item: any) => item.id == this.assetId,
        );
        this.realEstateName = res.data.find(
          (item: any) => item.id == this.assetId,
        ).name;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.assetDetail = undefined;
    }
    return res;
  }

  async fetchCash() {
    if (!this.portfolioId || !this.assetId) {
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
    if (!this.portfolioId || !this.assetId) {
      return;
    }
    let params: any = {
      PageSize: itemsPerPage,
      PageNumber: nextPage,
      Type: type,
    };
    if (endDate) params.EndDate = endDate;
    if (startDate) params.StartDate = startDate;

    const url = `/portfolio/${this.portfolioId}/realEstate/${this.assetId}/transactions`;
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

  async updateAssetDetail(params: any) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/${AssetTypeName.realEstate}/${this.assetId}`;
    const res: any = await httpService.put(url, {
      name: params.name,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      buyPrice: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      description: params.description,
      currentPrice: params.currentPrice,
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.assetDetail = res.data;
      return { isError: false, data: httpError.handleSuccessMessage('update') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
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

  resetInitialState() {
    runInAction(() => {
      this.portfolioInfo = undefined;
      this.cashDetail = undefined;
      this.currencyList = undefined;

      this.assetDetail = undefined;
      this.transactionHistory = undefined;

      this.isOpenAddNewTransactionModal = false;
      this.needUpdateOverviewData = true;

      this.currentPage = 1;
      this.transactionSelection = {
        startDate: null,
        endDate: null,
        type: 'all',
      };
    });
  }
}

export const realEstateDetailStore = new RealEstateDetailStore();
