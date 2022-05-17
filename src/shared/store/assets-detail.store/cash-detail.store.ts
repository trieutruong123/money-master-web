import { fcsapiService, httpService } from 'services';
import { action, makeAutoObservable, observable } from 'mobx';
import { portfolioData } from 'shared/store/portfolio/portfolio-data';
import { CashItem } from 'shared/models';
import { rootStore } from 'shared/store';
import { content } from 'i18n';

class CashDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  currencyId: string = '';
  cashId: number = 0;
  portfolioId: number = 0;
  currencyName: string | undefined = '';
  currencyCode: string = 'usd';
  cashDetail: CashItem | undefined = undefined;
  cashList: Array<CashItem> | undefined = undefined;

  transactionHistoryData: Array<any> = [];
  historicalMarketData: Array<any> = [];
  forexMarketData: any = undefined;
  forexDetail: any = undefined;
  timeInterval: number = 1;
  baseCurrencyCode: string = 'usd';
  timeFrame = '1h';

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      currencyId: observable,
      cashId: observable,
      portfolioId: observable,
      currencyName: observable,
      cashDetail: observable,

      transactionHistoryData: observable,
      historicalMarketData: observable,
      forexDetail: observable,
      timeFrame: observable,

      fetchHistoricalMarketData: action,
      fetchForexInfoByCode: action,

      setOpenAddNewTransactionModal: action,
      setCashId: action,
      setPortfolioId: action,
      setCurrencyId: action,
      setCurrencyCode: action,
      setTimeInterval: action,
      setBaseCurrency: action,
      setForexDetail: action,
    });
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setCurrencyId(code: string) {
    this.currencyId = code;
  }

  setCashId(id: string) {
    this.cashId = Number.parseInt(id);
  }

  setPortfolioId(id: string) {
    this.portfolioId = Number.parseInt(id);
  }

  setCurrencyCode(currencyCode: string) {
    this.currencyCode = currencyCode.toLowerCase();
  }

  setTimeInterval(interval: number) {
    this.timeInterval = interval;
    if (interval >= 1 && interval <= 2) this.timeFrame = '30m';
    if (interval >= 3 && interval <= 30) this.timeFrame = '4h';
    if (interval >= 31 && interval <= 180) this.timeFrame = '1d';
    if (interval > 180) this.timeFrame = '1w';
  }

  setBaseCurrency(baseCurrencyCode: string) {
    this.baseCurrencyCode = baseCurrencyCode;
  }

  setForexDetail(data: any) {
    this.forexDetail = data;
  }

  async fetchData() {
    const forexDetail = portfolioData.portfolioData.cash.find(
      (item) => item.id === this.currencyId,
    );
    this.setForexDetail(forexDetail);
    Promise.all([this.fetchForexInfoByCode(this.currencyId)]);
    return true;
  }

  async fetchCashDetail() {
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cashList = res.data;
      this.cashDetail = res.data.find((item: any) => item.id === this.cashId);
      this.currencyName = res.data.find(
        (item: any) => item.id === this.cashId,
      )?.name;

      this.currencyId = res.data
        .find((item: any) => item.id === this.cashId)
        ?.currencyCode.toLowerCase();
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cashDetail = undefined;
    }
  }

  async fetchHistoricalMarketData() {
    const symbol =
      this.currencyId.toUpperCase() + '/' + this.baseCurrencyCode.toUpperCase();
    const res: any = await fcsapiService.getForexOHCL({
      symbol,
      timeFrame: this.timeFrame,
    });
    if (!res.isError) {
      this.historicalMarketData = res.data;
    }
    return true;
  }

  async fetchForexInfoByCode(code: string) {
    const symbol =
      code.toUpperCase() + '/' + this.baseCurrencyCode.toUpperCase();

    if (code !== '' || code !== undefined) {
      const res: any = await fcsapiService.getForexInfoByCode({
        symbol,
      });
      if (!res.isError) {
        this.forexMarketData = res.data;
        return res.data;
      } else return undefined;
    }
  }

  async updateTransactionHistoryData() {
    const url = `/portfolio/${this.portfolioId}/cash/${this.cashId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.transactionHistoryData = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
    }
  }
}

export const cashDetailStore = new CashDetailStore();
