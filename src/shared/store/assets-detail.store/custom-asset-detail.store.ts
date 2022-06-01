import { action, computed, makeAutoObservable, observable } from "mobx";
import { CustomAssetItem } from "shared/models";

class CustomAssetDetailStore {
  portfolioId: number = 0;
  customAssetId: number = 0;
  customAssetDetail: CustomAssetItem | undefined = undefined;
  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      customAssetId: observable,
      customAssetDetail: observable,

      setPortfolioId: action,
      setCustomAssetId: action,
    });
  }

  setPortfolioId(portfolioId: string) {
    this.portfolioId = Number.parseFloat(portfolioId);
  }

  setCustomAssetId(assetId: string) {
    this.customAssetId = Number.parseFloat(assetId);
  }
}

export const customAssetsDetailStore = new CustomAssetDetailStore();
