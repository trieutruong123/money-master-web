import {
  Card,
  Box,
  useTheme,
  useMediaQuery,
  CardHeader,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  TableCell,
} from '@mui/material';
import dayjs from 'dayjs';
import { roundAndAddDotAndCommaSeparator } from 'utils/number';
import { AssetTypeName, TransactionTypeName } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';
import { CashTransactionList, StockTransactionList, TransactionItem } from 'shared/models';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TransactionType } from 'shared/types';
import { colorScheme } from 'utils';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { cashDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';
import es from 'date-fns/esm/locale/es/index.js';

const TableHeaderCell = styled(TableCell)`
  padding: 10px;
  color: #cbcbcd;
  font-weight: bold;
  text-transform: uppercase;
  border-top: 1px solid #e0e0e0;
  background-color: #fefdff;
`;

const TableBodyCellSymbol = styled(TableCell)`
  padding: 5px;
`;

const TableBodyCell = styled(TableCell)`
  padding: 5px;
  text-align: right;
`;

interface IProps {
  transactionHistoryData: CashTransactionList | undefined;
}

const CDTransactionHistory = observer(({ transactionHistoryData }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = ['Date', 'Amount', 'Type', 'From/To'];

  const renderSingleTransactionIncon = (
    record: TransactionItem,
  ) => {
    if (
      Array<any>(
        TransactionTypeName.BuyFromCash,
        TransactionTypeName.BuyFromFund,
        TransactionTypeName.BuyFromOutside,
        TransactionTypeName.AddValue,
        TransactionTypeName.NewAsset,
      ).includes(record.singleAssetTransactionType)
    ) {
      if (cashDetailStore.cashDetail?.id === record.destinationAssetId
        && record.destinationAssetType === AssetTypeName.cash) {
        return (
          <Box display="flex" alignItems="center" justifyContent={'center'}>
            <ImArrowLeft fontSize="25" color={colorScheme.green400} />
            &nbsp; {'BUY'}
          </Box>
        );
      }
      else {
        return (
          <Box display="flex" alignItems="center" justifyContent={'center'}>
            <ImArrowRight fontSize="25" color={colorScheme.red400} />
            &nbsp; {'TRANSFER'}
          </Box>
        );
      }
    } else if (
      Array<any>(
        TransactionTypeName.WithdrawValue,
        TransactionTypeName.WithdrawToCash,
        TransactionTypeName.WithdrawToOutside,
      ).includes(record.singleAssetTransactionType)) {
      if (cashDetailStore.cashDetail?.id === record.referentialAssetId
        && record.referentialAssetType === AssetTypeName.cash) {
        return (
          <Box display="flex" alignItems="center" justifyContent={'center'}>
            <ImArrowRight fontSize="25" color={colorScheme.red400} />
            &nbsp;
            {'WITHDRAW'}
          </Box>
        );
      }
      else {
        return (
          <Box display="flex" alignItems="center" justifyContent={'center'}>
            <ImArrowLeft fontSize="25" color={colorScheme.green400} />
            &nbsp;
            {'TRANSFER'}
          </Box>
        )
      }
    } else if (
      Array<any>(TransactionTypeName.MoveToFund).includes(record.singleAssetTransactionType)
    ) {
      return (
        <Box display="flex" alignItems="center" justifyContent={'center'}>
          <ImArrowRight fontSize="25" color={colorScheme.red400} />
          &nbsp; {'MOVE'}
        </Box>
      );
    }
    return <></>;
  };

  const renderFromToAssetType = (record: TransactionItem) => {
    if (Array<any>(
      TransactionTypeName.BuyFromCash,
      TransactionTypeName.BuyFromFund,
      TransactionTypeName.AddValue,
      TransactionTypeName.NewAsset,
    ).includes(record.singleAssetTransactionType)) {
      if (record.destinationAssetId === cashDetailStore.cashDetail?.id &&
        record.destinationAssetType === AssetTypeName.cash) {
        return record.referentialAssetType?.toUpperCase();
      }
      else {
        return record.destinationAssetType?.toUpperCase();
      }
    }
    else if (Array<any>(
      TransactionTypeName.WithdrawToCash,
      TransactionTypeName.WithdrawValue,
      TransactionTypeName.MoveToFund,
    ).includes(record.singleAssetTransactionType)) {
      if (record.destinationAssetId === cashDetailStore.cashDetail?.id &&
        record.destinationAssetType === AssetTypeName.cash) {
        return record.referentialAssetType?.toUpperCase();
      }
      else {
        return record.destinationAssetType?.toUpperCase();
      }
    }
    else if (Array<any>(
      TransactionTypeName.WithdrawToOutside,
      TransactionTypeName.BuyFromOutside,
    ).includes(record.singleAssetTransactionType)) {
      return 'OUTSIDE';
    }
  }


  return (
    <>
      {transactionHistoryData && transactionHistoryData?.length >= 0 ? (
        <Card
          sx={{
            borderRadius: '12px',
            padding: isMobile ? '5px 0px 0px 10px' : '5px 20px 20px 20px',
            boxShadow: '0 0 8px rgba(0,0,0,0.11)',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '3rem',
              boxShadow: 'none',
            }}
          >
            <CardHeader title="" sx={{ padding: '0px' }} />
            <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
              <MoreHorizIcon />
            </Button>
          </Card>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  {headings.map((heading, i) => (
                    <TableHeaderCell key={i} sx={{ textAlign: 'center' }}>
                      {heading}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionHistoryData.map((record, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{
                        cursor: 'pointer',
                        ':hover': {
                          backgroundColor: '#F7F7F7',
                        },
                      }}
                    >
                      <TableBodyCellSymbol align="center">
                        <Box
                          sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                        >
                          {dayjs(record.createdAt).format('DD/MM/YYYY')}
                        </Box>
                      </TableBodyCellSymbol>
                      <TableBodyCellSymbol align="center">
                        {getCurrencyByCode(record.currencyCode.toUpperCase())?.symbol}
                        {roundAndAddDotAndCommaSeparator(record.amount, 4)}
                      </TableBodyCellSymbol>
                      <TableBodyCellSymbol align='right'>
                        {renderSingleTransactionIncon(
                          record,
                        )}
                      </TableBodyCellSymbol>
                      <TableBodyCellSymbol align="center">
                        {renderFromToAssetType(record)}
                      </TableBodyCellSymbol>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Card>
      ) : null}
    </>
  );
});

export default CDTransactionHistory;
