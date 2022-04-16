import { action, makeAutoObservable, observable } from 'mobx';
import { Portfolio } from '../../types';
import { portfolioService } from 'services';
import { rootStore } from '../root.store';

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
}

export const portfolioStore = new PortfolioStore();
