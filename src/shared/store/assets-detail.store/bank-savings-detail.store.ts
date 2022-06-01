import { action, computed, makeAutoObservable, observable } from 'mobx';
import { httpService } from 'services';
import { BankSavingItem } from 'shared/models';
import { httpError } from 'shared/helpers';
import { rootStore } from 'shared/store';
import { content } from 'i18n';
class BankSavingsDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  portfolioId: string = '';
  bankSavingsName: string | undefined = '';
  assetId: string = '';
  assetDetail: BankSavingItem | undefined = undefined;
  transactionHistoryData: Array<any> = [];


  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      bankSavingsName: observable,
      assetId: observable,
      assetDetail: observable,

      setOpenAddNewTransactionModal: action,
      setPortfolioId: action,
      setAssetId: action,
      fetchBankSavingsDetail: action,
      updateAssetDetail: action,
      withdrawAllToCash:action
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
    const url = `/portfolio/${this.portfolioId}/bankSaving/${this.assetId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.transactionHistoryData = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
  }

  async withdrawAllToCash(cashId: number, currencyCode:string){
    var payload={
      currencyCode,
      transactionType:"withdrawToCash",
      destinationAssetId:cashId,
      destinationAssetType:"cash",
      referentialAssetId:this.assetId,
      referentialAssetType:"bankSaving",
      isTransferringAll:true
    }
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(url,payload);
    if (!res.isError) {
      await this.updateTransactionHistoryData();
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
  }

  async fetchBankSavingsDetail({
    portfolioId,
    assetId,
  }: {
    portfolioId: string;
    assetId: string;
  }) {
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: any = await httpService.get(url);
    if (!res.isError) {
      this.assetDetail = res.data.find((item: any) => item.id == assetId);
      this.bankSavingsName = res.data.find(
        (item: any) => item.id == assetId,
      )?.name;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.assetDetail = undefined;
    }
  }

  async updateAssetDetail(params: any) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/bankSaving/${this.assetId}`;
    const res: any = await httpService.put(url, {
      name: params.name,
      bankCode: params.bankCode,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      isGoingToReinState: params.isGoingToReinState,
      description: params.description,
      interestRate: params.interestRate,
      termRange: params.termRange,
      changeInterestRateType: 'CONTINUE_WITH_RATE',
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.assetDetail = res.data;
      return { isError: false, data: httpError.handleSuccessMessage('update') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }
}

export const bankSavingsDetailStore = new BankSavingsDetailStore();
