import { rootStore } from "shared/store";
import { getCurrencyByCode, httpError } from "shared/helpers";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { httpService } from "services";
import { CashItem, RealEstateItem, TransactionItem } from "shared/models";
import { content } from "i18n";
import { AssetTypeName, TransactionTypeName } from "shared/constants";
import {
  CurrencyItem,
  ITransactionRequest,
  Portfolio,
  TransferToInvestFundType,
} from "shared/types";

class RealEstateDetailStore {
  portfolioId: number = 0;
  currencyCode: string = "usd";
  portfolioInfo: Portfolio | undefined = undefined;

  realEstateName: string | undefined = "";
  assetId: number = 0;
  assetDetail: RealEstateItem | undefined = undefined;

  transactionHistory: Array<TransactionItem> | undefined = [];
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

      setPortfolioId: action,
      setOpenAddNewTransactionModal: action,
      setCurrency: action,
      setAssetId: action,
      setUpdateOverviewData: action,

      fetchRealEstateDetail: action,
      fetchRealEstateTransactionHistory: action,
      fetchPortfolioInfo: action,
      fetchCash: action,

      resetInitialState: action,

      createNewTransaction: action,
      transferAssetToInvestFund: action,
    });
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
      this.fetchRealEstateTransactionHistory(),
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
        content[rootStore.locale].success.default,
        "success"
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
          (item: any) => item.id == this.assetId
        );
        this.realEstateName = res.data.find(
          (item: any) => item.id == this.assetId
        ).name;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
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

  async fetchRealEstateTransactionHistory() {
    if (!this.portfolioId || !this.assetId) {
      return;
    }
    const url = `/portfolio/${this.portfolioId}/realEstate/${this.assetId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.transactionHistory = res.data;
      });
    } else {
    }
    return res;
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
      return { isError: false, data: httpError.handleSuccessMessage("update") };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
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
    });
  }
}

export const realEstateDetailStore = new RealEstateDetailStore();
