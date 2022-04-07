import { action, computed, makeAutoObservable, observable } from 'mobx';

class BankSavingsDetailStore {
  constructor() {
    makeAutoObservable(this, {});
  }
}

export const bankSavingsDetailStore = new BankSavingsDetailStore();
