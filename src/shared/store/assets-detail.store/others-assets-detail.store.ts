import { action, computed, makeAutoObservable, observable } from 'mobx';

class OtherAssetsDetailStore {
  constructor() {
    makeAutoObservable(this, {});
  }
}

export const otherAssetsDetailStore = new OtherAssetsDetailStore();
