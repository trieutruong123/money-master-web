import { action, makeAutoObservable, observable } from 'mobx';

class TransactionHistoryStore {
  isOpenAddNewTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      setOpenAddNewTransactionModal: action,
      fetchTransactionHistoryData: action,
    });
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  async fetchTransactionHistoryData() {
    return true;
  }

  updateTransactionHistoryData() {
    return true;
  }
}

export const transactionHistoryStore = new TransactionHistoryStore();
