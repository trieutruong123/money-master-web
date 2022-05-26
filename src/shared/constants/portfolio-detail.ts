import { AssetType } from "shared/types";

interface IAssetType {
  [index: string]: AssetType;
}

export const AssetTypeName: IAssetType = {
  cryptoCurrency: "crypto",
  stock: "stock",
  cash: "cash",
  bankSaving: "bankSaving",
  realEstate: "realEstate",
  comodity: "comodity",
  others: "custom",
};

export const PDBreadcrumbTabs = {
  holdings: "Holdings",
  report: "Report",
  investFund: "InvestFund",
  settings: "Settings",
};

export enum TransactionItemType {
  NewAsset = "newAsset",
  AddValue = "addValue",
  WithdrawValue = "withdrawValue",
  SellAsset = "sellAsset",
  MoveToFund = "moveToFund",
  BuyFromFund = "buyFromFund",
}
