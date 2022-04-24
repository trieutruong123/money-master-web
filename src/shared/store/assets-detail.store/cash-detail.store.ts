import { fcsapiService } from '../../../services';
import { action, makeAutoObservable, observable } from 'mobx';
import { portfolioData } from 'shared/store/portfolio/portfolio-data';

class CashDetailStore {
  isOpenAddNewTransactionModal: boolean = false;
  transactionHistoryData: Array<any> = [];
  historicalMarketData: Array<any> = [];
  currencyId: string = '';
  forexMarketData: any = undefined;
  forexDetail: any = undefined;
  timeInterval: number = 1;
  baseCurrencyCode: string = 'usd';
  timeFrame='1h'

  

  constructor() {
    makeAutoObservable(this, {
      isOpenAddNewTransactionModal: observable,
      transactionHistoryData: observable,
      historicalMarketData: observable,
      currencyId: observable,
      forexDetail: observable,
      timeFrame: observable,
      setOpenAddNewTransactionModal: action,
      fetchData: action,
      fetchHistoricalMarketData: action,
      setCurrencyId: action,
      setTimeInterval: action,
      setBaseCurrency: action,
    });
  }

  setOpenAddNewTransactionModal(isOpen: boolean) {
    this.isOpenAddNewTransactionModal = isOpen;
  }

  setCurrencyId(code: string) {
    this.currencyId = code;
  }

  setTimeInterval(interval: number) {
    this.timeInterval = interval;
    if (interval>=1 && interval<=2) this.timeFrame='30m';
    if (interval>=3 && interval<=30) this.timeFrame='4h';
    if (interval>=31&& interval<=180) this.timeFrame='1d';
    if (interval>180) this.timeFrame='1w';
  }

  setBaseCurrency(baseCurrencyCode: string) {
    this.baseCurrencyCode = baseCurrencyCode;
  }
  async fetchData() {
    this.forexDetail = portfolioData.portfolioData.cash.find(
      (item) => item.id === this.currencyId,
    );
    this.forexMarketData = await this.fetchForexInfoByCode(this.currencyId );
    return true;
  }

  async fetchHistoricalMarketData() {
    const symbol=this.currencyId.toUpperCase()+'/'+this.baseCurrencyCode.toUpperCase();
    const res: any = await fcsapiService.getForexOHCL({
      symbol,
      timeFrame: this.timeFrame,
  
    });
    if (!res.isError) {
      this.historicalMarketData = res.data;
    }
    return true;
  }

  async fetchForexInfoByCode(code: string ) {
    const symbol=code.toUpperCase()+'/'+this.baseCurrencyCode.toUpperCase();

    if (code !== '' || code !== undefined) {
      const res: any = await fcsapiService.getForexInfoByCode({
        symbol
      });
      if (!res.isError) return res.data;
      else return undefined;
    }
  }

  updateTransactionHistoryData() {
    return true;
  }
}

export const cashDetailStore = new CashDetailStore();
