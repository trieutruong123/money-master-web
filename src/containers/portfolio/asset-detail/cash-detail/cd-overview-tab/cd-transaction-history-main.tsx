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
  FormControl, 
  InputLabel, 
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { roundAndAddDotAndCommaSeparator } from 'utils/number';
import { AssetTypeConstants, AssetTypeName, TransactionHistoryContants, TransactionTypeName } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';
import { CashTransactionList, TransactionItem } from 'shared/models';
import { colorScheme } from 'utils';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { cashDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { Pagination } from 'shared/components';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {GrPowerReset } from 'react-icons/gr';
import { v4 as uuid } from 'uuid';


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
  content: any
}

const CDTransactionHistory = observer(({ transactionHistoryData, content }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [content.transactionHistory.date, content.transactionHistory.amount, content.transactionHistory.type, content.transactionHistory.fromTo];
  const [pageNumbers,setPageNumbers] = useState<Array<number>>([]);
  const router = useRouter();
  const { locale } = router;
  const language = locale === 'vi' ? 'vi' : locale === 'en' ? 'en' : 'en';


  const resetTransaction = async()=>{
    await cashDetailStore.resetTransaction();
    resetPageNumbers();
  }

  useEffect(()=>{
    resetPageNumbers();
  },[cashDetailStore.transactionHistory])


  const resetPageNumbers = () => {
    if (!cashDetailStore.transactionHistory) {
      return;
    }
    const currentPage = cashDetailStore.currentPage;
    const total = cashDetailStore.transactionHistory.length;
    const plus = total % TransactionHistoryContants.itemsPerPage? 1:0;
    const count = Math.floor(total / TransactionHistoryContants.itemsPerPage) + plus ;
    let arrPagination:Array<number> = [];

    if (count < 4 || currentPage <= 2) {
      arrPagination = Array.from({ length: count}, (_, i) => i + 1).slice(0, count);
    }
    else if (count >= 4 && currentPage === count ) {
      arrPagination =   Array.from({ length: count}, (_, i) => i + 1).slice(count-3, count);
    }
    else if (count >= 4 && currentPage < count) {
      arrPagination =   Array.from({ length: count}, (_, i) => i + 1).slice(currentPage-2, currentPage+1);
    }
    setPageNumbers(arrPagination);
  }

  const handlePageChange = async (pageNumber: number) => {
    const transactionHistory = cashDetailStore.transactionHistory&&cashDetailStore.transactionHistory.slice() || [];
    const total = transactionHistory.length;
    const plus = total % TransactionHistoryContants.itemsPerPage? 1:0
    const count = Math.floor(total / TransactionHistoryContants.itemsPerPage) + plus;
    if(pageNumber ===cashDetailStore.currentPage){
      return;
    }
    if (pageNumber < count && pageNumber > 0) {
      cashDetailStore.setCurrentPage(pageNumber);
      resetPageNumbers()
    }

    if(pageNumber == count ){
      const startDate = cashDetailStore.transactionSelection.startDate
      ? dayjs(cashDetailStore.transactionSelection.startDate).startOf('day').format(): null;
      const endDate = cashDetailStore.transactionSelection.endDate
      ? dayjs(cashDetailStore.transactionSelection.endDate).endOf('day').format(): null;
      const data = await cashDetailStore.fetchTransactionHistoryData({ 
                                                                  itemsPerPage: TransactionHistoryContants.itemsPerPage, 
                                                                  nextPage: pageNumber + 1, 
                                                                  type:cashDetailStore.transactionSelection.type,
                                                                  startDate:startDate,
                                                                  endDate:endDate});
      if (data && data.length > 0) {
        transactionHistory.push(...data);
        cashDetailStore.setTransactionHistory(transactionHistory);
      }
      cashDetailStore.setCurrentPage(pageNumber);
    }
  }

  const handleStartDateChange = async(value: any, keyboardInputValue?: string | undefined)=>{
    cashDetailStore.setSelectedTransaction('startDate',value);
    await cashDetailStore.refreshTransactionHistory();
  }

  const handleEndDateChange = async(value: any, keyboardInputValue?: string | undefined)=>{
    cashDetailStore.setSelectedTransaction("endDate",value);
    await cashDetailStore.refreshTransactionHistory();
  }
  
  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    cashDetailStore.setSelectedTransaction('type',event.target.value as any);
    await cashDetailStore.refreshTransactionHistory();
  }

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
            &nbsp; {content.transactionHistory.buy}
          </Box>
        );
      }
      else {
        return (
          <Box display="flex" alignItems="center" justifyContent={'center'}>
            <ImArrowRight fontSize="25" color={colorScheme.red400} />
            &nbsp; {content.transactionHistory.trasfer}
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
            {content.transactionHistory.withdraw}
          </Box>
        );
      }
      else {
        return (
          <Box display="flex" alignItems="center" justifyContent={'center'}>
            <ImArrowLeft fontSize="25" color={colorScheme.green400} />
            &nbsp;
            {content.transactionHistory.trasfer}
          </Box>
        )
      }
    } else if (
      Array<any>(TransactionTypeName.MoveToFund).includes(record.singleAssetTransactionType)
    ) {
      return (
        <Box display="flex" alignItems="center" justifyContent={'center'}>
          <ImArrowRight fontSize="25" color={colorScheme.red400} />
          &nbsp;{content.transactionHistory.move}
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
        return AssetTypeConstants[language][record.referentialAssetType|| AssetTypeName.outside ] || ''
      }
      else {
        return AssetTypeConstants[language][record.destinationAssetType ||AssetTypeName.outside ] || ''
      }
    }
    else if (Array<any>(
      TransactionTypeName.WithdrawToCash,
      TransactionTypeName.WithdrawValue,
      TransactionTypeName.MoveToFund,
    ).includes(record.singleAssetTransactionType)) {
      if (record.destinationAssetId === cashDetailStore.cashDetail?.id &&
        record.destinationAssetType === AssetTypeName.cash) {
        return AssetTypeConstants[language][record.referentialAssetType || AssetTypeName.outside] || ''
      }
      else {
        return AssetTypeConstants[language][record.destinationAssetType || AssetTypeName.outside] || ''
      }
    }
    else if (Array<any>(
      TransactionTypeName.WithdrawToOutside,
      TransactionTypeName.BuyFromOutside,
    ).includes(record.singleAssetTransactionType)) {
      return content.transactionHistory.outside;
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
              justifyContent: 'center',
              alignItems:'center',
              height: '5rem',
              boxShadow: 'none',
            }}
          >
            <CardHeader title="" sx={{padding: '0px', marginRight:'auto' }} />
            <FormControl sx={{ minWidth: '6rem', height:'4rem', px: '.2rem', mt:'10px'}}>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={cashDetailStore.transactionSelection.type||'all'}
                  label={'Type'}
                  onChange={handleSelectedTypeChange}
                >
                    <MenuItem key={uuid()} value={TransactionHistoryContants.all}>
                      All
                    </MenuItem>
                    <MenuItem key={uuid()} value={TransactionHistoryContants.in}>
                      In
                    </MenuItem>
                    <MenuItem key={uuid()} value={TransactionHistoryContants.out}>
                      Out
                    </MenuItem>
                </Select>
            </FormControl>
            <Box
                sx={{
                  mt:'10px',
                  height:'4rem'
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={'Start date'}
                    inputFormat="dd/MM/yyyy"
                    value = {cashDetailStore.transactionSelection.startDate}
                    onAccept={()=>true}
                    onChange={handleStartDateChange}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '10rem' }} />
                    )}
                  />
                </LocalizationProvider>
            </Box>
            <Box
              sx={{
                mt:'10px',
                height:'4rem',
                ml:'5px',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={'End date'}
                  inputFormat="dd/MM/yyyy"
                  value = {cashDetailStore.transactionSelection.endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '10rem' }} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <IconButton onClick = {resetTransaction} sx={{ padding: '0px', color: '#CBCBCD',marginLeft:'auto', width:'3rem', height:'3rem' }}>
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
                {transactionHistoryData.slice((cashDetailStore.currentPage-1)*TransactionHistoryContants.itemsPerPage,cashDetailStore.currentPage*TransactionHistoryContants.itemsPerPage).map((record, i) => {
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
            <Pagination pageNumbers={pageNumbers} currentPage = {cashDetailStore.currentPage} handleCurrentPage = {handlePageChange}/>
          </Box>
        </Card>
      ) : null}
    </>
  );
});

export default CDTransactionHistory;
