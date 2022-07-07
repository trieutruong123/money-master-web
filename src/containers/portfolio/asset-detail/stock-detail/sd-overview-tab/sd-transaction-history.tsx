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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import dayjs from 'dayjs';
import { roundAndAddDotAndCommaSeparator } from 'utils/number';
import { AssetTypeConstants, AssetTypeName, TransactionHistoryContants, TransactionTypeName } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';
import { StockTransactionList } from 'shared/models';
import { TransactionType } from 'shared/types';
import { colorScheme } from 'utils';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { useRouter } from 'next/router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GrPowerReset } from 'react-icons/gr';
import { v4 as uuid } from 'uuid';
import { stockDetailStore } from 'shared/store';
import { useEffect, useState } from 'react';
import { Pagination } from 'shared/components';
import { convertUTCToLocalTimeZone2 } from 'utils/time';

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
  content: any
  transactionHistoryData: StockTransactionList | undefined;
}

const SDTransactionHistory = ({ transactionHistoryData, content }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [content.transactionHistory.date,
  content.transactionHistory.amount,
  content.transactionHistory.type,
  content.transactionHistory.fromTo];
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);
  const router = useRouter();
  const { locale } = router;
  const language = locale === 'vi' ? 'vi' : locale === 'en' ? 'en' : 'en';

  const resetTransaction = async () => {
    await stockDetailStore.resetTransactionSelection();
    resetPageNumbers();
  }

  useEffect(() => {
    resetPageNumbers();
  }, [stockDetailStore.transactionHistory])


  const resetPageNumbers = () => {
    if (!stockDetailStore.transactionHistory) {
      return;
    }
    const currentPage = stockDetailStore.currentPage;
    const total = stockDetailStore.transactionHistory.length;
    const count = Math.floor(total / TransactionHistoryContants.itemsPerPage) + (total % TransactionHistoryContants.itemsPerPage ? 1 : 0);
    let arrPagination: Array<number> = [];

    if (count < 4 || currentPage <= 2) {
      arrPagination = Array.from({ length: count }, (_, i) => i + 1).slice(0, count);
    }
    else if (count >= 4 && currentPage === count) {
      arrPagination = Array.from({ length: count }, (_, i) => i + 1).slice(count - 3, count);
    }
    else if (count >= 4 && currentPage < count) {
      arrPagination = Array.from({ length: count }, (_, i) => i + 1).slice(currentPage - 2, currentPage + 1);
    }
    setPageNumbers(arrPagination);
  }

  const handlePageChange = async (pageNumber: number) => {
    const transactionHistory = stockDetailStore.transactionHistory && stockDetailStore.transactionHistory.slice() || [];
    const total = transactionHistory.length;
    const count = Math.floor(total / TransactionHistoryContants.itemsPerPage) + (total % TransactionHistoryContants.itemsPerPage ? 1 : 0);
    if (pageNumber === stockDetailStore.currentPage) {
      return;
    }
    if (pageNumber < count && pageNumber > 0) {
      stockDetailStore.setCurrentPage(pageNumber);
      resetPageNumbers()
    }

    if (pageNumber == count) {
      const startDate = stockDetailStore.transactionSelection.startDate
        ? dayjs(stockDetailStore.transactionSelection.startDate).startOf('day').format() : null;
      const endDate = stockDetailStore.transactionSelection.endDate
        ? dayjs(stockDetailStore.transactionSelection.endDate).endOf('day').format() : null;
      const data = await stockDetailStore.fetchTransactionHistoryData({
        itemsPerPage: TransactionHistoryContants.itemsPerPage,
        nextPage: pageNumber + 1,
        type: stockDetailStore.transactionSelection.type,
        startDate: startDate,
        endDate: endDate
      });
      if (data && data.length > 0) {
        transactionHistory.push(...data);
        stockDetailStore.setTransactionHistory(transactionHistory);
      }
      stockDetailStore.setCurrentPage(pageNumber);
    }
  }

  const handleStartDateChange = async (value: any, keyboardInputValue?: string | undefined) => {
    stockDetailStore.setSelectedTransaction('startDate', value);
    await stockDetailStore.refreshTransactionHistory();
  }

  const handleEndDateChange = async (value: any, keyboardInputValue?: string | undefined) => {
    stockDetailStore.setSelectedTransaction("endDate", value);
    await stockDetailStore.refreshTransactionHistory();
  }

  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    stockDetailStore.setSelectedTransaction('type', event.target.value as any);
    await stockDetailStore.refreshTransactionHistory();
  }

  const renderSingleTransactionIncon = (
    transactionType: TransactionType | null,
  ) => {
    if (
      Array<any>(
        TransactionTypeName.BuyFromCash,
        TransactionTypeName.BuyFromFund,
        TransactionTypeName.BuyFromOutside,
        TransactionTypeName.AddValue,
        TransactionTypeName.NewAsset,
      ).includes(transactionType)
    ) {
      return (
        <Box display="flex" alignItems="center" justifyContent={'center'}>
          <ImArrowLeft fontSize="25" color={colorScheme.green400} />
          &nbsp; {content.transactionHistory.buy}
        </Box>
      );
    } else if (
      Array<any>(
        TransactionTypeName.WithdrawToOutside,
        TransactionTypeName.WithdrawValue,
        TransactionTypeName.WithdrawToCash,
        TransactionTypeName.WithdrawToOutside,
      ).includes(transactionType)
    ) {
      return (
        <Box display="flex" alignItems="center" justifyContent={'center'}>
          <ImArrowRight fontSize="25" color={colorScheme.red400} />
          &nbsp;
          {content.transactionHistory.withdraw}
        </Box>
      );
    } else if (
      Array<any>(TransactionTypeName.MoveToFund).includes(transactionType)
    ) {
      return (
        <Box display="flex" alignItems="center" justifyContent={'center'}>
          <ImArrowRight fontSize="25" color={colorScheme.red400} />
          &nbsp; {content.transactionHistory.move}
        </Box>
      );
    }
    return <></>;
  };

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
              justifyContent: 'center',
              alignItems: 'center',
              height: '5rem',
              boxShadow: 'none',
            }}
          >
            <CardHeader title={content.transactionHistory.title} sx={{ padding: '0px', marginRight: 'auto' }} />
            <FormControl sx={{ minWidth: '70px', height: '4rem', px: '.2rem', mt: '10px' }}>
              <InputLabel id="type-select-label" >{content.transactionHistory.type}</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={stockDetailStore.transactionSelection.type || 'all'}
                label={content.transactionHistory.type}
                onChange={handleSelectedTypeChange}
              >
                <MenuItem key={uuid()} value={TransactionHistoryContants.all}>
                  {content.transactionHistory.all}
                </MenuItem>
                <MenuItem key={uuid()} value={TransactionHistoryContants.in}>
                  {content.transactionHistory.in}
                </MenuItem>
                <MenuItem key={uuid()} value={TransactionHistoryContants.out}>
                  {content.transactionHistory.out}
                </MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                mt: '10px',
                height: '4rem'
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={content.transactionHistory.startDate}
                  inputFormat="dd/MM/yyyy"
                  value={stockDetailStore.transactionSelection.startDate}
                  onAccept={() => true}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '10rem' }} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                mt: '10px',
                height: '4rem',
                ml: '5px',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={content.transactionHistory.endDate}
                  inputFormat="dd/MM/yyyy"
                  value={stockDetailStore.transactionSelection.endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '10rem' }} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <IconButton onClick={resetTransaction} sx={{ padding: '0px', color: '#CBCBCD', marginLeft: 'auto', width: '3rem', height: '3rem' }}>
              <GrPowerReset />
            </IconButton>
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
                {transactionHistoryData
                  .slice(
                    (stockDetailStore.currentPage - 1) *
                    TransactionHistoryContants.itemsPerPage,
                    stockDetailStore.currentPage *
                    TransactionHistoryContants.itemsPerPage,
                  )
                  .map((record, i) => {
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
                            record.singleAssetTransactionType,
                          )}
                        </TableBodyCellSymbol>
                        <TableBodyCellSymbol align="center">
                          {Array<any>(
                            TransactionTypeName.BuyFromCash,
                            TransactionTypeName.BuyFromFund,
                            TransactionTypeName.AddValue,
                            TransactionTypeName.NewAsset,
                          ).includes(record.singleAssetTransactionType)
                            ? AssetTypeConstants[language][record.referentialAssetType || AssetTypeName.outside] || ""
                            : Array<any>(
                              TransactionTypeName.WithdrawToCash,
                              TransactionTypeName.WithdrawValue,
                              TransactionTypeName.MoveToFund,
                            ).includes(record.singleAssetTransactionType)
                              ? AssetTypeConstants[language][record.destinationAssetType || AssetTypeName.outside] || ""
                              : Array<any>(
                                TransactionTypeName.WithdrawToOutside,
                                TransactionTypeName.BuyFromOutside,
                              ).includes(record.singleAssetTransactionType) ?
                                content.transactionHistory.outside
                                : ''
                          }
                        </TableBodyCellSymbol>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Pagination pageNumbers={pageNumbers} currentPage={stockDetailStore.currentPage} handleCurrentPage={handlePageChange} />

          </Box>
        </Card>
      ) : null}
    </>
  );
};

export default SDTransactionHistory;
