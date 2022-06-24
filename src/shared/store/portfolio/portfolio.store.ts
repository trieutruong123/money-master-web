import { action, makeAutoObservable, observable } from 'mobx';
import { Portfolio } from 'shared/types';
import { rootStore } from 'shared/store';
import { portfolioService } from 'services';

class PortfolioStore {
  portfolio: Array<Portfolio> = [];
  isOpenAddNewPortfolioModal: boolean = false;
  constructor() {
    makeAutoObservable(this, {
      portfolio: observable,
      isOpenAddNewPortfolioModal: observable,
      setOpenAddNewPortfolioModal: action,
      fetchPortfolioData: action,
      addNewPortfolio: action,
      updatePortfolio: action,
      deletePortfolio: action,
    });
  }

  setOpenAddNewPortfolioModal(isOpen: boolean) {
    this.isOpenAddNewPortfolioModal = isOpen;
  }

  async fetchPortfolioData() {
    this.portfolio = await portfolioService.getPortfolioList();
  }

  async addNewPortfolio(data: any) {
    rootStore.startLoading();
    portfolioService
      .addNewPortfolio(data)
      .then((portfolio) => this.portfolio.push(portfolio));
    rootStore.stopLoading();
  }

  async updatePortfolio(data: any) {
    rootStore.startLoading();
    await portfolioService.updatePortfolio(data)
    await this.fetchPortfolioData()
    rootStore.stopLoading();
  }

  async deletePortfolio(portfolioId: string) {
    rootStore.startLoading();
    await portfolioService.deletePortfolio(portfolioId)
    await this.fetchPortfolioData()
      
    rootStore.stopLoading();
  }
}

export const portfolioStore = new PortfolioStore();
