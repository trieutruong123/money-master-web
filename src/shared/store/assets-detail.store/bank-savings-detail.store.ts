import { action, computed, makeAutoObservable, observable } from 'mobx';
import { httpService } from 'services';
import { BankSavingItem } from 'shared/models';
import { httpError } from 'shared/helpers';
import { rootStore } from 'shared/store';
class BankSavingsDetailStore {
  portfolioId: string = '';
  assetId: string = '';
  assetDetail: BankSavingItem | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      assetId: observable,
      assetDetail: observable,

      setPortfolioId: action,
      setAssetId: action,
      fetchBankSavingsDetail: action,
      updateAssetDetail: action,
    });
  }

  setPortfolioId(val: string) {
    this.portfolioId = val;
  }

  setAssetId(val: string) {
    this.assetId = val;
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
    } else {
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
