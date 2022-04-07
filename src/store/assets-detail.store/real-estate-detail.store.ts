import { action, computed, makeAutoObservable, observable } from 'mobx';

class RealEstateDetailStore {
  constructor() {
    makeAutoObservable(this, {});
  }
}

export const realEstateDetailStore = new RealEstateDetailStore();
