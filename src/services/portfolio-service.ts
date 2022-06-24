import { Portfolio } from "../shared/types";
import { httpService } from "./http-service";

export const portfolioService = {
  getPortfolioList,
  addNewPortfolio,
  updatePortfolio,
  deletePortfolio,
};

async function getPortfolioList() {
  const url = "/portfolio";
  const raw: any = await httpService.get(url);
  var res: Array<Portfolio> = [];
  if (!raw.isError) {
    res = raw.data.map((portfolio: any) => {
      return portfolio as Portfolio;
    });
    return res;
  }
  return res;
}

async function addNewPortfolio(data: any) {
  const url = "/portfolio";
  const res: any = await httpService.post(url, data);

  if (!res.isError) {
    return res.data;
  }
  return res;
}

async function updatePortfolio(data: any) {
  const url = "/portfolio/"+data.portfolioId;
  const res: any = await httpService.put(url, data);

  if (!res.isError) {
    return res.data;
  }
  return res;
}

async function deletePortfolio(portfolioId: string) {
  const url = "/portfolio/"+portfolioId;
  const res: any = await httpService.delete(url);

  if (!res.isError) {
    return res.data;
  }
  return res;
}
