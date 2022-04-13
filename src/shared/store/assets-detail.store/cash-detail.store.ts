import { action, computed, makeAutoObservable, observable } from 'mobx';

class CashDetailStore {
  constructor() {
    makeAutoObservable(this, {});
  }
}

export const cashDetailStore = new CashDetailStore();
