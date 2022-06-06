import { AssetType } from "shared/types";

export interface IAssetType {
  [index: string]: AssetType;
}

export enum AssetTypeName {
  cryptoCurrency = "crypto",
  stock = "stock",
  cash = "cash",
  bankSaving = "bankSaving",
  realEstate = "realEstate",
  custom = "custom",
  fund = "fund",
}

export const AssetTypeConstants = {
  crypto: "crypto currency",
  stock: "stock",
  cash: "cash",
  bankSaving: "bank saving",
  realEstate: "real estate",
  custom: "custom",
  fund: "fund",
};

export const PDBreadcrumbTabs = {
  holdings: "Holdings",
  report: "Report",
  investFund: "InvestFund",
  settings: "Settings",
};

export enum TransactionTypeName {
  NewAsset = "newAsset",
  AddValue = "addValue",
  WithdrawValue = "withdrawValue",
  SellAsset = "sellAsset",
  MoveToFund = "moveToFund",
  BuyFromFund = "buyFromFund",
  BuyFromCash = "buyFromCash",
  BuyFromOutside = "buyFromOutside",
  WithDrawToCash = "withdrawToCash",
}

export const TransactionTypeConstants = {
  newAsset: "new asset",
  addValue: "add value",
  withdrawValue: "withdraw value",
  withdrawToOutside: "withdraw to outside",
  sellAsset: "sell asset",
  moveToFund: "move to fund",
  buyFromFund: "buy from fund",
  buyFromCash: "buy from cash",
  buyFromOutside: "buy from outside",
};

export enum UsingMoneySource {
  usingOutside = "usingMoneyFromOutside",
  usingFund = "usingMoneyFromFund",
  usingCash = "usingMoneyFromCash",
}

export const UsingMoneyContants = {
  usingOutside: "Using money from outside",
  usingFund: "Using money from fund",
  usingCash: "Using money from cash",
};

export enum TransactionFormType {
  transaction = "transaction",
  search = "search",
  selectType = "selectType",
  selectMoneySource = "selectMoneySource",
}

export enum TransactionRequestType {
  addValue = "addValue",
  withdrawToCash = "withdrawToCash",
  moveToFund = "moveToFund",
  buyFromCash = "buyFromCash",
  buyFromFund = "buyFromFund",
  buyFromOutside = "buyFromOutside",
  withdrawToOutside = "withdrawToOutside",
  withdrawValue = "withdrawValue",
}
