import { SankeyNodeConstants, SankeyNodeType } from "shared/constants";
import { SankeyDataItem } from "shared/models";

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

function foundSiblingSankeyPair(single: SankeyDataItem, pairs: SankeyDataItem[]) {
  const foundSankeyPair = pairs.find((item: SankeyDataItem) => {
    if (single.targetId === item.sourceId &&
      single.targetName === item.sourceName &&
      single.targetType === item.sourceType &&
      single.sourceId === item.targetId &&
      single.sourceName === item.targetName &&
      single.sourceType === item.targetType)
    {
      return true;
    }
    else {
      return false;
    }
  })
  return foundSankeyPair;
}

export function standardlizeSankeyResponse(pairs: Array<SankeyDataItem> | undefined) {
  // if sankey array is undefined or empty array, so return [];
  if (!pairs || !pairs.length) {
    return [];
  }
  const newPairs: Array<SankeyDataItem> = [];
  const checked: Array<boolean> = Array(pairs.length).fill(false);
  
  pairs.map((item: SankeyDataItem, index: number) => {
    //if this pair is found and included in previous calculation, so return;
    if (checked[index]) {
      return;
    }

    const found = foundSiblingSankeyPair(item, pairs);
    //if this is only-chlid pair, push into newPairs;
    if (!found) {
      newPairs.push(item);
    }
    else {
      //if this pair is one of the twins
      const finalAmount = found.amount - item.amount;
      const pair = finalAmount > 0 ? { ...found, amount: finalAmount }:{...item, amount:-finalAmount};
      newPairs.push(pair);

      const foundIndex = pairs.indexOf(found);
      checked[foundIndex] = true;
    }
    checked[index] = true;
  });

  return newPairs;
}