import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import { coinGeckoService, httpService, finhubService } from 'services';
import { content } from 'i18n';
import {
  RealEstateItem,
  BankSavingItem,
  CashItem,
  CryptoItem,
  PieChartItem,
  StockItem,
  PersonalInterestCustomAssetItem,
  CustomAssetItemByCategory,
  InvestFundTransactionItem,
  CustomAssetItem,
  InvestFundResponse,
  SankeyDataItem,
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
  NewPortfolioCustomAsset,
  AssetType,
  NewPersonalAssetType,
  TransferToInvestFundType,
  IAddedAsset,
  ITransactionRequest,
  ITransactionListRequest,
} from 'shared/types';
import {
  AssetTypeName,
  PDBreadcrumbTabs,
  TransactionHistoryContants,
} from 'shared/constants';
import { rootStore } from 'shared/store';
import { httpError } from 'shared/helpers';
import {
  getSankeyNodeType,
  standardlizeSankeyResponse,
} from 'shared/helpers/sankey-chart';
import dayjs from 'dayjs';

class PortfolioDetailStore {
  portfolioId: number = 0;
  portfolioInfo: Portfolio | undefined = undefined;
  currencyCode: string = '';
  selectedTabs: string = PDBreadcrumbTabs.holdings;

  portfolioValue: number = 0;
  todaysChange: number = 0;
  customAssetList: Array<PersonalInterestCustomAssetItem> | undefined =
    undefined;

  stockDetail: Array<StockItem> | undefined = undefined;
  cryptoDetail: Array<CryptoItem> | undefined = undefined;
  cashDetail: Array<CashItem> | undefined = undefined;
  realEstateDetail: Array<RealEstateItem> | undefined = undefined;
  bankingDetail: Array<BankSavingItem> | undefined = undefined;
  customAssetDetail: Array<CustomAssetItemByCategory> | undefined = undefined;

  isOpenAddNewAssetModal: boolean = false;
  searchedStockDetail: any = undefined;
  searchedCryptoDetail: any = undefined;
  selectedCustomAssetId: number = 0;
  selectedAsset: IAddedAsset | undefined = undefined;

  needUpdatedInvestFundData: boolean = false;
  needUpdatedCash: boolean = false;

  investFundDetail: InvestFundResponse | undefined = undefined;
  investFundTransactionHistory: Array<InvestFundTransactionItem> = [];
  investFundTransactionSelection: {
    type: 'all' | 'in' | 'out';
    startDate: Date | null;
    endDate: Date | null;
    currentPage: number;
  } = { type: 'all', startDate: null, endDate: null, currentPage: 1 };

  needUpdatedReportData: boolean = false;
  sankeyFlowData: Array<SankeyDataLink> | undefined = undefined;
  pieChartData: Array<PieChartItem> | undefined = undefined;
  sankeySelection: { startDate: Date | null; endDate: Date | null } = {
    startDate: null,
    endDate: null,
  };

  isOpenTransferToInvestFundModal: boolean = false;
  transferedAssetInfo:
    | {
        assetType: AssetType;
        assetId: number;
        portfolioId: number;
        valueOfReferentialAsset: number;
      }
    | undefined = undefined;

  isOpenDeleteAssetModal: boolean = false;
  deletedAssetInfo:
    | { assetType: AssetType; assetId: number; portfolioId: number }
    | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      portfolioId: observable,
      portfolioInfo: observable,
      currencyCode: observable,
      selectedTabs: observable,

      stockDetail: observable,
      cryptoDetail: observable,
      cashDetail: observable,
      realEstateDetail: observable,
      bankingDetail: observable,
      customAssetDetail: observable,

      needUpdatedReportData: observable,
      sankeyFlowData: observable,
      pieChartData: observable,
      sankeySelection: observable,

      needUpdatedInvestFundData: observable,
      needUpdatedCash: observable,

      investFundDetail: observable,
      investFundTransactionSelection: observable,
      investFundTransactionHistory: observable,

      isOpenAddNewAssetModal: observable,
      searchedStockDetail: observable,
      searchedCryptoDetail: observable,
      selectedCustomAssetId: observable,
      selectedAsset: observable,

      isOpenDeleteAssetModal: observable,
      deletedAssetInfo: observable,

      setOpenAddNewAssetModal: action,
      setOpenDeleteAssetModal: action,
      setPortfolioId: action,
      setSelectedCustomAssetId: action,
      setTransferedAssetInfo: action,
      setOpenTransferToInvestFundModal: action,
      setUpdateInvestFund: action,
      setUpdateCashDetail: action,
      setUpdateReport: action,
      setAddedAssetInfo: action,
      setSankeySelection: action,
      setInvestFundTransactionSelection: action,
      setInvestFundTransactionHistory: action,

      resetInitialState: action,

      fetchRealEstate: action,
      fetchPersonalCustomAsset: action,
      fetchSankeyFlowData: action,
      fetchBankSaving: action,
      fetchCryptoCurrency: action,
      fetchStock: action,
      fetchCash: action,
      fetchPortfolioInfo: action,
      fetchInvestFundInfo: action,
      fetchPieChartData: action,

      addNewBankSaving: action,
      addNewRealEstate: action,
      addNewCryptoCurrency: action,
      addNewStock: action,
      createNewTransaction: action,

      editPortfolioInfo: action,

      getStockInfoById: action,
      getCryptoInfoById: action,
      getCashAssetById: action,

      isMissingHoldingsData: computed,
      isMissingReportData: computed,
      isMissingInvestFundData: computed,
    });
  }

  setPortfolioId(id: string) {
    this.portfolioId = Number.parseInt(id);
  }

  setSelectedTabs(newTab: string) {
    this.selectedTabs = newTab;
  }

  setSankeySelection(key: string, value: any) {
    this.sankeySelection = {
      ...this.sankeySelection,
      [key]: value,
    };
  }

  setOpenAddNewAssetModal(isOpen: boolean) {
    this.isOpenAddNewAssetModal = isOpen;
  }

  setSelectedCustomAssetId(id: number) {
    this.selectedCustomAssetId = id;
  }

  setInvestFundTransactionHistory(history: InvestFundTransactionItem[]) {
    this.investFundTransactionHistory = history;
  }

  setInvestFundTransactionSelection(key: string, value: any) {
    this.investFundTransactionSelection = {
      ...this.investFundTransactionSelection,
      [key]: value,
    };
  }

  setOpenTransferToInvestFundModal(isOpen: boolean) {
    this.isOpenTransferToInvestFundModal = isOpen;
  }

  setTransferedAssetInfo(
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
    valueOfReferentialAsset: number,
  ) {
    this.transferedAssetInfo = {
      assetType: assetType,
      assetId: Number.parseInt(assetId),
      portfolioId: Number.parseInt(portfolioId),
      valueOfReferentialAsset: valueOfReferentialAsset,
    };
  }

  setAddedAssetInfo(info: IAddedAsset) {
    this.selectedAsset = { ...info };
  }

  setOpenDeleteAssetModal(isOpen: boolean) {
    this.isOpenDeleteAssetModal = isOpen;
  }

  setDeletedAssetInfo(
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) {
    this.deletedAssetInfo = {
      assetType: assetType,
      assetId: Number.parseInt(assetId),
      portfolioId: Number.parseInt(portfolioId),
    };
  }

  setUpdateReport(isNeedUpdated: boolean) {
    this.needUpdatedReportData = isNeedUpdated;
  }

  setUpdateCashDetail(isNeedUpdated: boolean) {
    this.needUpdatedCash = isNeedUpdated;
  }

  setUpdateInvestFund(isNeedUpdated: boolean) {
    this.needUpdatedInvestFundData = isNeedUpdated;
  }

  async fetchInitialData() {
    if (!this.portfolioId) {
      return;
    }
    this.currencyCode = 'usd';

    Promise.all([
      this.fetchPortfolioInfo(),
      this.fetchBankSaving(),
      this.fetchCash(),
      this.fetchCryptoCurrency(),
      this.fetchStock(),
      this.fetchRealEstate(),
      this.fetchOtherCustomAsset(),
    ]);
  }

  async fetchPortfolioInfo() {
    const url = `/portfolio`;
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      const currentPortfolio = res.data.find(
        (item: Portfolio) => item.id == this.portfolioId,
      );
      runInAction(() => {
        this.portfolioInfo = currentPortfolio;
        this.currencyCode = this.portfolioInfo?.initialCurrency || 'usd';
      });
    } else {
      runInAction(() => {
        this.portfolioInfo = undefined;
      });
    }
  }

  async fetchPersonalCustomAsset() {
    const url = '/personalAsset/interest/custom';
    const res: { isError: boolean; data: any } = await httpService.get(url);

    if (!res.isError) {
      runInAction(() => {
        this.customAssetList = res.data;
      });
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      runInAction(() => {
        this.customAssetList = undefined;
      });
    }
  }

  async fetchStock() {
    const url = `/portfolio/${this.portfolioId}/stock`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.stockDetail = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      runInAction(() => {
        this.stockDetail = undefined;
      });
    }
  }

  async fetchCryptoCurrency() {
    const url = `/portfolio/${this.portfolioId}/crypto`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.cryptoDetail = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      runInAction(() => {
        this.cryptoDetail = undefined;
      });
    }
  }

  async fetchBankSaving() {
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.bankingDetail = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      runInAction(() => {
        this.bankingDetail = undefined;
      });
    }
  }

  async fetchRealEstate() {
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.realEstateDetail = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      runInAction(() => {
        this.realEstateDetail = undefined;
      });
    }
  }

  async fetchCash() {
    const url = `/portfolio/${this.portfolioId}/cash`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.cashDetail = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      runInAction(() => {
        this.cashDetail = undefined;
      });
    }
  }

  async fetchOtherCustomAsset() {
    const url = `/portfolio/${this.portfolioId}/custom`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    if (!res.isError) {
      runInAction(() => {
        this.customAssetDetail = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      runInAction(() => {
        this.customAssetDetail = undefined;
      });
    }
  }

  async editPortfolioInfo({
    newName,
    newCurrency,
  }: {
    newName: string;
    newCurrency: string;
  }) {
    const url = `/portfolio/${this.portfolioId}`;
    const res: { isError: boolean; data: any } = await httpService.put(url, {
      newName,
      newCurrency,
    });
    if (!res.isError) {
      runInAction(() => {
        this.portfolioInfo = res.data;
      });
    } else {
      runInAction(() => {
        this.portfolioInfo = undefined;
      });
    }
    return res;
  }

  async addNewRealEstate(params: NewRealEstateAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/realEstate`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.realEstateDetail?.push(res.data);
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else {
      if (params.isUsingInvestFund) {
        return { isError: true, data: res.data.data };
      }
      return {
        isError: true,
        data: httpError.handleErrorCode(res),
      };
    }
  }

  async addNewBankSaving(params: NewBanksSavingAsset) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/bankSaving`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.bankingDetail?.push(res.data);
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else {
      if (params.isUsingInvestFund) {
        return { isError: true, data: res.data.data };
      }
      return {
        isError: true,
        data: httpError.handleErrorCode(res),
      };
    }
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
      Promise.all([this.fetchCryptoCurrency()]);
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else {
      if (params.isUsingInvestFund) {
        return { isError: true, data: res.data.data };
      }
      return {
        isError: true,
        data: httpError.handleErrorCode(res),
      };
    }
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
      Promise.all([this.fetchStock()]);
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else {
      if (params.isUsingInvestFund) {
        return { isError: true, data: res.data.data };
      }
      return {
        isError: true,
        data: httpError.handleErrorCode(res),
      };
    }
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
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else {
      if (params.isUsingInvestFund) {
        return { isError: true, data: res.data.data };
      }
      return {
        isError: true,
        data: httpError.handleErrorCode(res),
      };
    }
  }

  async addNewOtherCustomAsset(
    customInterestAssetId: number,
    params: NewPortfolioCustomAsset,
  ) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/custom/${customInterestAssetId}`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      Promise.all([this.fetchOtherCustomAsset()]);
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else {
      if (params.isUsingInvestFund) {
        return { isError: true, data: res.data.data };
      }
      return {
        isError: true,
        data: httpError.handleErrorCode(res),
      };
    }
  }

  async addNewCustomAsseType(params: NewPersonalAssetType) {
    rootStore.startLoading();
    const url = `/personalAsset/interest/custom`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      this.customAssetList?.push(res.data);
      return { isError: false, data: httpError.handleSuccessMessage('add') };
    } else return { isError: true, data: httpError.handleErrorCode(res) };
  }

  async createNewTransaction(params: ITransactionRequest) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.badRequest);
      return res;
    }
  }

  async searchData({
    type,
    searchingText,
  }: {
    type: AssetType;
    searchingText: string;
  }): Promise<Array<SearchingDataItem>> {
    rootStore.startLoading();
    var res: { isError: boolean; data: any };
    switch (type) {
      case AssetTypeName.stock:
        res = await finhubService.searchForStock(searchingText);
        break;
      case AssetTypeName.cryptoCurrency:
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

  async deleteAsset() {
    if (this.deletedAssetInfo != undefined) {
      rootStore.startLoading();
      const url = `/portfolio/${this.portfolioId}/${this.deletedAssetInfo.assetType}/${this.deletedAssetInfo.assetId}`;
      const res: { isError: boolean; data: any } = await httpService.delete(
        url,
      );
      rootStore.stopLoading();
      if (!res.isError) {
        rootStore.raiseNotification(
          content[rootStore.locale].success.delete,
          'success',
        );
        switch (this.deletedAssetInfo.assetType) {
          case AssetTypeName.cryptoCurrency:
            runInAction(() => {
              this.cryptoDetail = this.cryptoDetail?.filter(
                (item) => item.id !== res.data.id,
              );
            });
            break;
          case AssetTypeName.stock:
            runInAction(() => {
              this.stockDetail = this.stockDetail?.filter(
                (item) => item.id !== res.data.id,
              );
            });
            break;
          case AssetTypeName.bankSaving:
            runInAction(() => {
              this.bankingDetail = this.bankingDetail?.filter(
                (item) => item.id !== res.data.id,
              );
            });
            break;
          case AssetTypeName.realEstate:
            runInAction(() => {
              this.realEstateDetail = this.realEstateDetail?.filter(
                (item) => item.id !== res.data.id,
              );
            });
            break;
          case AssetTypeName.cash:
            runInAction(() => {
              this.cashDetail = this.cashDetail?.filter(
                (item) => item.id !== res.data.id,
              );
            });
            break;
          case AssetTypeName.custom:
            runInAction(() => {
              this.customAssetDetail = this.customAssetDetail?.map((item) => {
                const assetList = item.assets.filter(
                  (cur) => cur.id !== res.data.id,
                );
                return {
                  ...item,
                  assets: assetList,
                };
              });
            });
            break;
          default:
            break;
        }
        return res;
      } else {
        rootStore.raiseError(content[rootStore.locale].error.default);
        return res;
      }
    }
    return {
      isError: true,
      data: '',
    };
  }

  async transferAssetToInvestFund(params: TransferToInvestFundType) {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/transactions`;
    const res: { isError: boolean; data: any } = await httpService.post(
      url,
      params,
    );
    rootStore.stopLoading();
    if (!res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.transfer,
        'success',
      );
      this.fetchDataAfterTransferringToInvestFund();
      return res;
    } else {
      rootStore.raiseError(content[rootStore.locale].error.default);
      return res;
    }
  }

  async fetchReportData() {
    Promise.all([this.fetchSankeyFlowData(), this.fetchPieChartData()]);
  }

  async fetchSankeyFlowData() {
    const url = `/portfolio/${this.portfolioId}/sankey`;
    const params: any = {};
    if (this.sankeySelection.startDate)
      params.StartDate = dayjs(this.sankeySelection.startDate)
        .startOf('date')
        .format();
    if (this.sankeySelection.endDate)
      params.EndDate = dayjs(this.sankeySelection.endDate)
        .endOf('date')
        .format();
    const res: { isError: boolean; data: any } = await httpService.get(
      url,
      params,
    );

    if (!res.isError) {
      runInAction(() => {
        const qualifiedData = standardlizeSankeyResponse(res.data);
        this.sankeyFlowData = qualifiedData.map((link: SankeyDataItem) => {
          return {
            source: `${getSankeyNodeType(link.sourceType).toUpperCase()}_${
              link.sourceId || ''
            }@@${
              link.sourceName ? link.sourceName.toUpperCase() : link.sourceName
            }`,
            target: `${getSankeyNodeType(link.targetType).toUpperCase()}_${
              link.targetId || ''
            }@@${
              link.targetName ? link.targetName.toUpperCase() : link.targetName
            }`,
            value: link.amount,
          };
        });
      });
    } else {
      this.sankeyFlowData = [];
    }
  }

  async fetchPieChartData() {
    rootStore.startLoading();
    const url = `/portfolio/${this.portfolioId}/pieChart`;
    const res: { isError: boolean; data: any } = await httpService.get(url);
    rootStore.stopLoading();
    if (!res.isError) {
      runInAction(() => {
        this.pieChartData = res.data;
      });
    } else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData,
      );
      this.pieChartData = undefined;
    }
  }

  async fetchInvestFundData() {
    Promise.all([
      await this.fetchInvestFundInfo(),
      await this.refreshInestFundTransactionHistory(),
    ]);
  }

  async fetchInvestFundInfo() {
    const url = `/portfolio/${this.portfolioId}/fund`;
    const res = await httpService.get(url);

    if (!res.isError) {
      runInAction(() => {
        this.investFundDetail = res.data;
      });
    } else {
      runInAction(() => {
        this.investFundDetail = undefined;
      });
    }
  }

  async fetchInvestFundTransactionHistory({
    itemsPerPage,
    nextPage,
    startDate,
    endDate,
    type,
  }: ITransactionListRequest) {
    let params: any = {
      PageSize: itemsPerPage,
      PageNumber: nextPage,
      Type: type,
    };
    if (endDate) params.EndDate = endDate;
    if (startDate) params.StartDate = startDate;

    const url = `/portfolio/${this.portfolioId}/investFund/transactions`;
    const res: { isError: boolean; data: any } = await httpService.get(
      url,
      params,
    );
    if (!res.isError) {
      return res.data;
    } else {
      return [];
    }
  }

  async getStockInfoById(stockId: string) {
    rootStore.startLoading();
    const res = await finhubService.getStockInfoByCode({
      symbol: stockId.toUpperCase(),
    });
    rootStore.stopLoading();
    if (!res.isError) {
      runInAction(() => {
        this.searchedStockDetail = res.data;
      });
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
      runInAction(() => {
        this.searchedCryptoDetail = res.data?.market_data?.current_price;
      });
    } else this.searchedCryptoDetail = undefined;
  }

  get isMissingInvestFundData() {
    return (
      this.investFundTransactionHistory === undefined ||
      this.investFundDetail === undefined
    );
  }

  getCashAssetById(cashId: number) {
    return this.cashDetail?.find((asset) => asset.id == cashId);
  }

  get isMissingHoldingsData(): boolean {
    return (
      this.bankingDetail === undefined &&
      this.cryptoDetail === undefined &&
      this.cashDetail === undefined &&
      this.stockDetail === undefined &&
      this.cryptoDetail === undefined &&
      this.realEstateDetail === undefined &&
      this.customAssetDetail === undefined
    );
  }

  get isMissingReportData(): boolean {
    return this.pieChartData === undefined && this.sankeyFlowData === undefined;
  }

  findAssetByIdAndType(assetType: AssetType, assetId: number) {
    switch (assetType) {
      case AssetTypeName.cryptoCurrency:
        var crypto = this.cryptoDetail?.find((item) => item.id === assetId);
        return crypto;
      case AssetTypeName.cash:
        var cash = this.cashDetail?.find((item) => item.id === assetId);
        return cash;
      case AssetTypeName.stock:
        var stock = this.stockDetail?.find((item) => item.id === assetId);
        return stock;
      case AssetTypeName.bankSaving:
        var bankSaving = this.bankingDetail?.find(
          (item) => item.id === assetId,
        );
        return bankSaving;
      case AssetTypeName.realEstate:
        var realEstate = this.realEstateDetail?.find(
          (item) => item.id === assetId,
        );
        return realEstate;
      case AssetTypeName.custom:
        var category = this.customAssetDetail?.find(
          (category: CustomAssetItemByCategory) => {
            return category.assets.some(
              (item: CustomAssetItem) => item.id === assetId,
            );
          },
        );
        var otherAsset = category?.assets.find((item) => item.id === assetId);
        return otherAsset;
      default:
        return undefined;
    }
  }

  async fetchDataAfterTransferringToInvestFund() {
    switch (this.transferedAssetInfo?.assetType) {
      case AssetTypeName.cryptoCurrency:
        Promise.all([this.fetchCryptoCurrency()]);
        break;
      case AssetTypeName.stock:
        Promise.all([this.fetchStock()]);
        break;
      case AssetTypeName.bankSaving:
        Promise.all([this.fetchBankSaving()]);
        break;
      case AssetTypeName.realEstate:
        Promise.all([this.fetchRealEstate()]);
        break;
      case AssetTypeName.cash:
        Promise.all([this.fetchCash()]);
        break;
      case AssetTypeName.custom:
        Promise.all([this.fetchOtherCustomAsset()]);
        break;
      default:
        break;
    }
  }

  async fetchDataAfterMakingTransaction(assetType: AssetType) {
    switch (assetType) {
      case AssetTypeName.cryptoCurrency:
        Promise.all([this.fetchCryptoCurrency()]);
        break;
      case AssetTypeName.stock:
        Promise.all([this.fetchStock()]);
        break;
      case AssetTypeName.bankSaving:
        Promise.all([this.fetchBankSaving()]);
        break;
      case AssetTypeName.realEstate:
        Promise.all([this.fetchRealEstate()]);
        break;
      case AssetTypeName.cash:
        Promise.all([this.fetchCash()]);
        break;
      case AssetTypeName.custom:
        Promise.all([this.fetchOtherCustomAsset()]);
        break;
      default:
        break;
    }
  }

  async refreshInestFundTransactionHistory() {
    const startDate = this.investFundTransactionSelection.startDate
      ? dayjs(this.investFundTransactionSelection.startDate)
          .startOf('day')
          .format()
      : null;
    const endDate = this.investFundTransactionSelection.endDate
      ? dayjs(this.investFundTransactionSelection.endDate).endOf('day').format()
      : null;
    const data = await this.fetchInvestFundTransactionHistory({
      itemsPerPage: 3 * TransactionHistoryContants.itemsPerPage,
      nextPage: 1,
      type: this.investFundTransactionSelection.type,
      startDate: startDate,
      endDate: endDate,
    });
    this.setInvestFundTransactionHistory(data);
    this.setInvestFundTransactionSelection('currentPage', 1);
  }

  resetInvestFundTransactionSelection() {
    this.setInvestFundTransactionSelection('currentPage', 1);
    this.setInvestFundTransactionSelection('type', 'all');
    this.setInvestFundTransactionSelection('startDate', null);
    this.setInvestFundTransactionSelection('endDate', null);
  }

  resetInitialState() {
    runInAction(() => {
      this.stockDetail = undefined;
      this.cashDetail = undefined;
      this.cryptoDetail = undefined;
      this.realEstateDetail = undefined;
      this.bankingDetail = undefined;
      this.customAssetDetail = undefined;
      this.portfolioInfo = undefined;

      this.isOpenAddNewAssetModal = false;
      this.isOpenDeleteAssetModal = false;
      this.isOpenTransferToInvestFundModal = false;

      this.investFundDetail = undefined;
      this.investFundTransactionHistory = [];
      this.investFundTransactionSelection = {
        currentPage: 1,
        type: 'all',
        startDate: null,
        endDate: null,
      };

      this.pieChartData = undefined;
      this.sankeyFlowData = undefined;
      this.sankeySelection = { startDate: null, endDate: null };

      this.selectedTabs = PDBreadcrumbTabs.holdings;
    });
  }
}

export const portfolioDetailStore = new PortfolioDetailStore();
