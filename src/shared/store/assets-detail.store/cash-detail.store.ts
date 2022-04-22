import { content } from 'i18n';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { httpService } from 'services';
import { CashItem } from 'shared/models';
import { rootStore } from 'shared/store';

class CashDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  //transactionHistoryData: Array<any> = [];
  cashId: number = 0;
  portfolioId: number = 0;
  currencyCode: string = 'usd';
  cashDetail: CashItem | undefined = undefined;
  cashList: Array<CashItem> | undefined = undefined;
  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      cashId: observable,
      currencyCode: observable,
      cashDetail: observable,
      cashList: observable,
    });
  }

  setIsOpenTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setCashId(id: string) {
    this.cashId = Number.parseInt(id);
  }

  setPortfolioId(id: string) {
    this.portfolioId = Number.parseInt(id);
  }

  setCurrencyCode(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  async fetchCash() {
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cashList = res.data;
      this.cashDetail = res.data.find((item: any) => item.id === this.cashId);
      this.currencyCode = res.data.find(
        (item: any) => item.id === this.cashId,
      )?.currencyCode;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cashDetail = undefined;
    }
  }
}

export const cashDetailStore = new CashDetailStore();
