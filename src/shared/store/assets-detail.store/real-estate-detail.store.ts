import { rootStore } from "shared/store";
import { httpError } from "shared/helpers";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { httpService } from "services";
import { RealEstateItem } from "shared/models";
import { content } from "i18n";
import { AssetTypeName, TransactionTypeName } from "shared/constants";

class RealEstateDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  portfolioId: string = "";
  realEstateName: string | undefined = "";
  assetId: string = "";
  assetDetail: RealEstateItem | undefined = undefined;
  transactionHistoryData: Array<any> = [];

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      realEstateName: observable,
      assetId: observable,
      assetDetail: observable,

      setOpenAddNewTransactionModal: action,
      setPortfolioId: action,
      setAssetId: action,
      fetchRealEstateDetail: action,
      updateAssetDetail: action,
      withdrawAllToCash: action,
      moveAllToFund: action,
    });
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setPortfolioId(val: string) {
    this.portfolioId = val;
  }

  setAssetId(val: string) {
    this.assetId = val;
  }

  async updateTransactionHistoryData() {
    const url = `/portfolio/${this.portfolioId}/${AssetTypeName.realEstate}/${this.assetId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.transactionHistoryData = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
  }

  async withdrawAllToCash(cashId: number, currencyCode: string) {
    var payload = {
      currencyCode,
      transactionType: TransactionTypeName.WithdrawToCash,
      destinationAssetId: cashId,
      destinationAssetType: AssetTypeName.cash,
      referentialAssetId: this.assetId,
      referentialAssetType: AssetTypeName.realEstate,
      isTransferringAll: true,
    };
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      payload
    );
    if (!res.isError) {
      await this.updateTransactionHistoryData();
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
  }

  async moveAllToFund(currencyCode: string) {
    var payload = {
      referentialAssetId: this.assetId,
      referentialAssetType: AssetTypeName.realEstate,
      currencyCode,
      isTransferringAll: true,
    };
    const url = `/portfolio/${this.portfolioId}/${AssetTypeName.fund}`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      payload
    );
    if (!res.isError) {
      await this.updateTransactionHistoryData();
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
  }

  async fetchRealEstateDetail({
    portfolioId,
    assetId,
  }: {
    portfolioId: string;
    assetId: string;
  }) {
    const url = `/portfolio/${portfolioId}/${AssetTypeName.realEstate}`;
    const res: any = await httpService.get(url);
    if (!res.isError) {
      this.assetDetail = res.data.find((item: any) => item.id == assetId);
      this.realEstateName = res.data.find(
        (item: any) => item.id == assetId
      ).name;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
      this.assetDetail = undefined;
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
      return { isError: false, data: httpError.handleSuccessMessage("update") };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }
}

export const realEstateDetailStore = new RealEstateDetailStore();
