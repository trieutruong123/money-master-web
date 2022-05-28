import { AiFillMinusCircle } from 'react-icons/ai';
import { GiBuyCard, GiSellCard } from 'react-icons/gi';
import { IoIosAddCircle } from 'react-icons/io';
import { ImBoxRemove } from 'react-icons/im';
import { TransactionType } from 'shared/types';
import { TransactionTypeName } from 'shared/constants';

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
    case TransactionTypeName.AddValue:
      return <GiBuyCard color={color} style={{ ...style }} />;
    case TransactionTypeName.SellAsset:
      return <GiSellCard color={color} style={{ ...style }} />;
    case TransactionTypeName.WithdrawValue:
      return <AiFillMinusCircle color={color} style={{ ...style }} />;
    case TransactionTypeName.NewAsset:
      return <IoIosAddCircle color={color} style={{ ...style }} />;
    case TransactionTypeName.MoveToFund:
      return <ImBoxRemove color={color} style={{ ...style }} />;
    default:
      return <></>;
  }
};
