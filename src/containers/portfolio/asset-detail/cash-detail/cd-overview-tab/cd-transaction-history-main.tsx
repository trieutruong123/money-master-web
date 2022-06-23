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
  SelectChangeEvent
} from '@mui/material';
import dayjs from 'dayjs';
import { roundAndAddDotAndCommaSeparator } from 'utils/number';
import { AssetTypeConstants, AssetTypeName, TransactionHistoryContants, TransactionTypeName } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';
import { CashTransactionList, TransactionItem } from 'shared/models';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colorScheme } from 'utils';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { cashDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { Pagination } from 'shared/components';
import { useEffect, useState } from 'react';

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

  const transactionType = [{
      label:'All',
      tyle: TransactionHistoryContants.all,
    },
    {
      label:'Go in',
      type: TransactionHistoryContants.in
    },
    {
      label:'Go out',
      type:TransactionHistoryContants.out
    }   
  ]

  const resetTransaction = async()=>{
    const data = await cashDetailStore.fetchTransactionHistoryData({itemsPerPage:3 * TransactionHistoryContants.itemsPerPage, nextPage:1, type:'all'});
    cashDetailStore.setTransactionHistory(data);
    cashDetailStore.setCurrentPage(1);
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
    const count = Math.round(total / TransactionHistoryContants.itemsPerPage) + 1;
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
    console.log(arrPagination);
    setPageNumbers(arrPagination);
  }

  const handlePageChange = async (pageNumber: number) => {
    const transactionHistory = cashDetailStore.transactionHistory&&cashDetailStore.transactionHistory.slice() || [];
    const total = transactionHistory.length;
    const count = Math.round(total / 10) + 1;

    if (pageNumber < count && pageNumber > 0) {
      cashDetailStore.setCurrentPage(pageNumber);
      resetPageNumbers()
    }

    if(pageNumber == count ){
      const data = await cashDetailStore.fetchTransactionHistoryData({ itemsPerPage: 10, nextPage: pageNumber + 1, type: cashDetailStore.selectedType, });
      if (data && data.length > 0) {
        transactionHistory.push(...data);
        cashDetailStore.setTransactionHistory(transactionHistory);
      }
    }
  }

  const handleDateChange = async()=>{

  }
  
  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    cashDetailStore.setSelectedTransactionType(event.target.value as any);
    const data = await cashDetailStore.fetchTransactionHistoryData({itemsPerPage:3 * TransactionHistoryContants.itemsPerPage, nextPage:1, type:event.target.value as any});
    cashDetailStore.setTransactionHistory(data);
    cashDetailStore.setCurrentPage(1);
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
        return AssetTypeConstants[language][record.referentialAssetType || AssetTypeName.custom] || ""
      }
      else {
        return AssetTypeConstants[language][record.destinationAssetType || AssetTypeName.custom] || ""
      }
    }
    else if (Array<any>(
      TransactionTypeName.WithdrawToCash,
      TransactionTypeName.WithdrawValue,
      TransactionTypeName.MoveToFund,
    ).includes(record.singleAssetTransactionType)) {
      if (record.destinationAssetId === cashDetailStore.cashDetail?.id &&
        record.destinationAssetType === AssetTypeName.cash) {
        return AssetTypeConstants[language][record.referentialAssetType || AssetTypeName.custom] || ""
      }
      else {
        return AssetTypeConstants[language][record.destinationAssetType || AssetTypeName.custom] || ""
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
              justifyContent: 'space-between',
              height: '3rem',
              boxShadow: 'none',
            }}
          >
            <CardHeader title="" sx={{ padding: '0px' }} />
            {/* <FormControl sx={{ minWidth: 80, px: '.2rem', pb: '.2rem' }}>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={cashDetailStore.selectedType}
                  label={'Type'}
                  onChange={handleSelectedTypeChange}
                >
                  {transactionType.map((item, index) => (
                    <MenuItem key={index.toString()} value={item.type}>
                      {item.label}
                    </MenuItem>
                  ))}1
                </Select>
              </FormControl> */}
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
                {transactionHistoryData.slice((cashDetailStore.currentPage-1)*10,cashDetailStore.currentPage*10).map((record, i) => {
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
