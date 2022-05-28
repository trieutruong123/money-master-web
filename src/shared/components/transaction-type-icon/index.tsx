import { AiFillMinusCircle } from 'react-icons/ai';
import { GiBuyCard, GiSellCard } from 'react-icons/gi';
import { IoIosAddCircle } from 'react-icons/io';
import { ImBoxRemove } from 'react-icons/im';
import { TransactionType } from 'shared/types';
import { TransactionItemType } from 'shared/constants';

interface IProps {
  transactionType: TransactionType;
  style?: any;
  color?: string;
}

export const TransactionTypeIcon = ({
  transactionType,
  color,
  style,
}: IProps) => {
  switch (transactionType) {
    case TransactionItemType.AddValue:
      return <GiBuyCard color={color} style={{ ...style }} />;
    case TransactionItemType.SellAsset:
      return <GiSellCard color={color} style={{ ...style }} />;
    case TransactionItemType.WithdrawValue:
      return <AiFillMinusCircle color={color} style={{ ...style }} />;
    case TransactionItemType.NewAsset:
      return <IoIosAddCircle color={color} style={{ ...style }} />;
    case TransactionItemType.MoveToFund:
      return <ImBoxRemove color={color} style={{ ...style }} />;
    default:
      return <></>;
  }
};
