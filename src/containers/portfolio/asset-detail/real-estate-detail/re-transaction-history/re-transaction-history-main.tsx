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
import { RealEstateTransactionList, StockTransactionList } from 'shared/models';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TransactionType } from 'shared/types';
import { colorScheme } from 'utils';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';
import { Pagination } from 'shared/components';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {GrPowerReset } from 'react-icons/gr';
import { v4 as uuid } from 'uuid';
import { realEstateDetailStore } from 'shared/store';



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
  transactionHistoryData: RealEstateTransactionList | undefined;
}

const RETransactionHistory = ({ transactionHistoryData }: IProps) => {
  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].realEstateDetailPage : i18n['en'].realEstateDetailPage;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [content.transactionHistory.date, content.transactionHistory.amount, content.transactionHistory.type, content.transactionHistory.fromTo];
  const language = locale === 'vi' ? 'vi' : locale === 'en' ? 'en' : 'en';
  const [pageNumbers,setPageNumbers] = useState<Array<number>>([]);

  const resetTransaction = async()=>{
    await realEstateDetailStore.resetTransaction();
    resetPageNumbers();
  }

  useEffect(()=>{
    resetPageNumbers();
  },[realEstateDetailStore.transactionHistory])


  const resetPageNumbers = () => {
    if (!realEstateDetailStore.transactionHistory) {
      return;
    }
    const currentPage = realEstateDetailStore.currentPage;
    const total = realEstateDetailStore.transactionHistory.length;
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
    const transactionHistory = realEstateDetailStore.transactionHistory&&realEstateDetailStore.transactionHistory.slice() || [];
    const total = transactionHistory.length;
    const plus = total % TransactionHistoryContants.itemsPerPage? 1:0
    const count = Math.floor(total / TransactionHistoryContants.itemsPerPage) + plus;
    if(pageNumber ===realEstateDetailStore.currentPage){
      return;
    }
    if (pageNumber < count && pageNumber > 0) {
      realEstateDetailStore.setCurrentPage(pageNumber);
      resetPageNumbers()
    }

    if(pageNumber == count ){
      const startDate = realEstateDetailStore.transactionSelection.startDate
      ? dayjs(realEstateDetailStore.transactionSelection.startDate).startOf('day').format(): null;
      const endDate = realEstateDetailStore.transactionSelection.endDate
      ? dayjs(realEstateDetailStore.transactionSelection.endDate).endOf('day').format(): null;
      const data = await realEstateDetailStore.fetchTransactionHistoryData({ 
                                                                  itemsPerPage: TransactionHistoryContants.itemsPerPage, 
                                                                  nextPage: pageNumber + 1, 
                                                                  type:realEstateDetailStore.transactionSelection.type,
                                                                  startDate:startDate,
                                                                  endDate:endDate});
      if (data && data.length > 0) {
        transactionHistory.push(...data);
        realEstateDetailStore.setTransactionHistory(transactionHistory);
      }
      realEstateDetailStore.setCurrentPage(pageNumber);
    }
  }

  const handleStartDateChange = async(value: any, keyboardInputValue?: string | undefined)=>{
    realEstateDetailStore.setSelectedTransaction('startDate',value);
    await realEstateDetailStore.refreshTransactionHistory();
  }

  const handleEndDateChange = async(value: any, keyboardInputValue?: string | undefined)=>{
    realEstateDetailStore.setSelectedTransaction("endDate",value);
    await realEstateDetailStore.refreshTransactionHistory();
  }
  
  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    realEstateDetailStore.setSelectedTransaction('type',event.target.value as any);
    await realEstateDetailStore.refreshTransactionHistory();
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
          &nbsp;{content.transactionHistory.buy}
        </Box>
      );
    } else if (
      Array<any>(
        TransactionTypeName.WithdrawToOutside,
        TransactionTypeName.WithdrawValue,
        TransactionTypeName.WithdrawToCash,
        TransactionTypeName.WithdrawToOutside,
      ).includes(transactionType)) {
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
              justifyContent: 'space-between',
              height: '3rem',
              boxShadow: 'none',
            }}
          >
            <CardHeader title="" sx={{padding: '0px', marginRight:'auto' }} />
            <FormControl sx={{ minWidth: '6rem', height:'4rem', px: '.2rem', mt:'10px'}}>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={realEstateDetailStore.transactionSelection.type||'all'}
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
                    value = {realEstateDetailStore.transactionSelection.startDate}
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
                  value = {realEstateDetailStore.transactionSelection.endDate}
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
                        {getCurrencyByCode(record.currencyCode)?.symbol}
                        {roundAndAddDotAndCommaSeparator(record.amount, 4)}
                      </TableBodyCellSymbol>
                      <TableBodyCellSymbol align="center">
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
                            TransactionTypeName.WithdrawValue,
                            TransactionTypeName.MoveToFund,
                            TransactionTypeName.WithdrawToCash
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
            <Pagination pageNumbers={pageNumbers} currentPage = {realEstateDetailStore.currentPage} handleCurrentPage = {handlePageChange}/>
          </Box>
        </Card>
      ) : null}
    </>
  );
};


export default RETransactionHistory;
