import { NewPortfolioCustomAsset } from './../../types/portfolio-detail.type';
import { action, makeAutoObservable, observable } from 'mobx';
import {
  coinGeckoService,
  httpService,
  finhubService,
  portfolioService,
} from 'services';
import { content } from 'i18n';
import {
  PortfolioAllocation,
  RealEstateItem,
  BankSavingItem,
  CashItem,
  CryptoItem,
  PieChartItem,
  StockItem,
  PersonalInterestCustomAssetItem,
  CustomAssetItemByCategory,
} from 'shared/models';
import {
  Portfolio,
  NewStockAsset,
  NewCryptoCurrencyAsset,
  SearchingDataItem,
  NewBanksSavingAsset,
  NewRealEstateAsset,
  NewCashAsset,
  SankeyDataLink,
} from 'shared/types';
import { portfolioStore, rootStore } from 'shared/store';
import { httpError } from 'shared/helpers';
import { portfolioData } from './portfolio-data';

class PortfolioDetailStore {
  portfolioId: number = 0;
  portfolioName: string = '';
  currencyCode: string = '';

  portfolioAllocationData: Array<PortfolioAllocation> = [];
  portfolioValue: number = 0;
  todaysChange: number = 0;

  stockDetail: Array<StockItem> | undefined = undefined;
  cryptoDetail: Array<CryptoItem> | undefined = undefined;
  cashDetail: Array<CashItem> | undefined = undefined;
  realEstateDetail: Array<RealEstateItem> | undefined = undefined;
  bankingDetail: Array<BankSavingItem> | undefined = undefined;
  customAssetDetail: Array<CustomAssetItemByCategory> | undefined = undefined;
  searchedStockDetail: any = undefined;
  searchedCryptoDetail: any = undefined;

  isOpenAddNewAssetModal: boolean = false;
  customAssetList: Array<PersonalInterestCustomAssetItem> | undefined =
    undefined;

  sankeyFlowData: Array<SankeyDataLink> = [];
  pieChartData: Array<PieChartItem> | undefined = [];

  constructor() {
    makeAutoObservable(this, {
      searchedStockDetail: observable,
      searchedCryptoDetail: observable,
      portfolioId: observable,
      portfolioName: observable,
      portfolioAllocationData: observable,
      stockDetail: observable,
      cryptoDetail: observable,
      cashDetail: observable,
      realEstateDetail: observable,
      bankingDetail: observable,
      portfolioValue: observable,
      todaysChange: observable,
      isOpenAddNewAssetModal: observable,
      sankeyFlowData: observable,

      setOpenAddNewAssetModal: action,
      setPortfolioId: action,

      fetchPortfolioDetailData: action,
      fetchRealEstate: action,
      fetchPersonalCustomAsset: action,
      fetchSankeyFlowData: action,
      fetchBankSaving: action,
      fetchCryptoCurrency: action,
      fetchStock: action,
      fetchCash: action,

      addNewBankSaving: action,
      addNewRealEstate: action,
      addNewCryptoCurrency: action,
      addNewStock: action,

      getStockInfoById: action,
      getCryptoInfoById: action,
    });
  }

  setOpenAddNewAssetModal(isOpen: boolean) {
    this.isOpenAddNewAssetModal = isOpen;
  }

  setPortfolioId(id: string) {
    this.portfolioId = Number.parseInt(id);
  }

  setPortfolioName(portfolioId: string) {
    this.portfolioName =
      portfolioStore.portfolio.find(
        (item: Portfolio) => item.id === portfolioId,
      )?.name || '';
  }

  async fetchInitialData() {
    await this.fetchBankSaving();
    await this.fetchCash();
    await this.fetchCryptoCurrency();
    await this.fetchStock();
    await this.fetchRealEstate();
    await this.fetchOtherCustomAsset();
    await this.fetchPieChartData();
    await this.fetchSankeyFlowData();
  }

  async fetchPersonalCustomAsset() {
    const url = '/personalAsset/interest/custom';
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      this.customAssetList = res.data;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      this.customAssetList = undefined;
    }
  }

  async fetchPortfolioDetailData() {
    this.currencyCode = 'usd';
    this.portfolioAllocationData = portfolioData.portfolioAllocation;
    const portfolioDetail = portfolioData.portfolioData;
    return true;
  }

  async fetchStock() {
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.stockDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.stockDetail = undefined;
    }
  }

  async fetchCryptoCurrency() {
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cryptoDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cryptoDetail = undefined;
    }
  }

  async fetchBankSaving() {
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.bankingDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.bankingDetail = undefined;
    }
  }

  async fetchRealEstate() {
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.realEstateDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.realEstateDetail = undefined;
    }
  }

  async fetchCash() {
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.cashDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.cashDetail = undefined;
    }
  }

  async fetchOtherCustomAsset() {
    const url = `/portfolio/${this.portfolioId}/custom`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      this.customAssetDetail = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.customAssetDetail = undefined;
    }
  }
  async addNewRealEstate(params: NewRealEstateAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.post(url, {
      name: params.name,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      buyPrice: params.inputMoneyAmount,
      currentPrice: params.currentPrice,
      description: params.description,
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.realEstateDetail?.push(res.data);
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewBankSaving(params: NewBanksSavingAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.post(url, {
      name: params.name,
      bankCode: params.bankCode,
      inputDay: params.inputDay,
      inputMoneyAmount: params.inputMoneyAmount,
      inputCurrency: params.inputCurrency,
      isGoingToReinState: params.isGoingToReinState,
      interestRate: params.interestRate,
      description: params.description,
      termRange: params.termRange,
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.bankingDetail?.push(res.data);
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewCryptoCurrency(params: NewCryptoCurrencyAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.cryptoDetail?.push(res.data);
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewStock(params: NewStockAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.stockDetail?.push(res.data);
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewCash(params: NewCashAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.cashDetail?.push(res.data);
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async addNewOtherCustomAsset(params: NewPortfolioCustomAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/custom/${params.customInterestAssetInfoId}`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.customAssetDetail?.push(res.data);
      this.fetchOtherCustomAsset();
      this.fetchPieChartData();
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async searchData({
    type,
    searchingText,
  }: {
    type: string;
    searchingText: string;
  }): Promise<Array<SearchingDataItem>> {
    rootStore.startLoading();
    var res: { isError: boolean; data: any };
    switch (type) {
      case 'stocks':
        res = await finhubService.searchForStock(searchingText);
        break;
      case 'cryptoCurrency':
        res = await coinGeckoService.searchForCoin(searchingText);
        break;
      default:
        res = { isError: true, data: [] };
        break;
    }
    rootStore.stopLoading();
    if (!res.isError) return res.data.slice(0, 100);
    else return [];
  }

  async fetchSankeyFlowData() {
    var raw = await portfolioService.getCashFlowData(
      this.portfolioId.toString(),
    );
    this.sankeyFlowData = raw.map((link) => {
      return {
        source: `${link.sourceType}@@${link.sourceName}`,
        target: `${link.targetType}@@${link.targetName}`,
        //error: type 'string' is incompatible with 'string',
        // value: link.amount.toString(),
        value: link.amount,
      };
    });
  }

  async fetchPieChartData() {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/pieChart`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    rootStore.stopLoading();
    if (!res.isError) {
      this.pieChartData = res.data;
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.pieChartData = undefined;
    }
  }

  async getStockInfoById(stockId: string) {
    rootStore.startLoading();
    const res = await finhubService.getStockInfoByCode({
      symbol: stockId.toUpperCase(),
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.searchedStockDetail = res.data;
    } else this.searchedStockDetail = undefined;
  }

  async getCryptoInfoById(coinCode: string) {
    rootStore.startLoading();
    const res = await coinGeckoService.getCoinInfoByCode({
      coinCode: coinCode.toLowerCase(),
      exclude: {
        localization: true,
        ticker: true,
        communityData: true,
        developerData: true,
      },
    });
    rootStore.stopLoading();
    if (!res.isError) {
      this.searchedCryptoDetail = res.data?.market_data?.current_price;
    } else this.searchedCryptoDetail = undefined;
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();
