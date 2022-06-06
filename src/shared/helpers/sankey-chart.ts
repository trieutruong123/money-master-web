enum SankeyNodeType {
  bankSaving = "bankSaving",
  realEstate = "realEstate",
  cash = "cash",
  crypto = "crypto",
  stock = "stock",
  custom = "custom",
  outsideIn = "outsideIn",
  outsideOut = "outsideOut",
}

enum SankeyNodeConstants {
  bankSaving = "bank saving",
  realEstate = "real estate",
  cash = "cash",
  crypto = "crypto",
  stock = "stock",
  custom = "custom",
}
export function getSankeyNodeType(type: string) {
  switch (type) {
    case SankeyNodeType.bankSaving:
      return SankeyNodeConstants.bankSaving;
    case SankeyNodeType.realEstate:
      return SankeyNodeConstants.realEstate;
    case SankeyNodeType.crypto:
      return SankeyNodeConstants.crypto;
    case SankeyNodeType.stock:
      return SankeyNodeConstants.stock;
    case SankeyNodeType.custom:
      return SankeyNodeConstants.custom;
    case SankeyNodeType.outsideIn:
    case SankeyNodeType.outsideOut:
    default:
      return "";
  }
}
