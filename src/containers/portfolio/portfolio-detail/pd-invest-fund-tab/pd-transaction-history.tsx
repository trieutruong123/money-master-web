import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  capitalizeFirstLetter,
  colorScheme,
  roundAndAddDotAndCommaSeparator,
} from 'utils';
import { getCurrencyByCode } from 'shared/helpers';
import dayjs from 'dayjs';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import {
  InvestFundTransactionItem,
  InvestFundTransactionList,
} from 'shared/models';
import { AssetType } from 'shared/types';
import {
  AssetTypeConstants,
  AssetTypeName,
  TransactionHistoryContants,
  TransactionRequestType,
} from 'shared/constants';
import { BsCashCoin } from 'react-icons/bs';
import { RiPsychotherapyFill } from 'react-icons/ri';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useRouter } from 'next/router';
import { Pagination } from 'shared/components';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GrPowerReset } from 'react-icons/gr';
import { v4 as uuid } from 'uuid';
import { portfolioDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';

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
  transactionHistory: InvestFundTransactionList | undefined;
  content: any;
}

const PDTransactionHistory = observer(({ transactionHistory, content }: IProps) => {
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { locale } = router;
  const language = locale === 'vi' ? 'vi' : locale === 'en' ? 'en' : 'en';
  const headings = [
    content.investFundTab.amount,
    content.investFundTab.transactionType,
    content.investFundTab.assetType,
    '',
  ];

  const resetTransaction = async () => {
    portfolioDetailStore.resetInvestFundTransactionSelection();
    await portfolioDetailStore.refreshInestFundTransactionHistory();
    resetPageNumbers();
  };

  useEffect(() => {
    resetPageNumbers();
  }, [portfolioDetailStore.investFundTransactionHistory]);

  const resetPageNumbers = () => {
    if (!portfolioDetailStore.investFundTransactionHistory) {
      return;
    }
    const currentPage =
      portfolioDetailStore.investFundTransactionSelection.currentPage;
    const total = portfolioDetailStore.investFundTransactionHistory.length;
    const plus = total % TransactionHistoryContants.itemsPerPage ? 1 : 0;
    const count =
      Math.floor(total / TransactionHistoryContants.itemsPerPage) + plus;
    let arrPagination: Array<number> = [];

    if (count < 4 || currentPage <= 2) {
      arrPagination = Array.from({ length: count }, (_, i) => i + 1).slice(
        0,
        count,
      );
    } else if (count >= 4 && currentPage === count) {
      arrPagination = Array.from({ length: count }, (_, i) => i + 1).slice(
        count - 3,
        count,
      );
    } else if (count >= 4 && currentPage < count) {
      arrPagination = Array.from({ length: count }, (_, i) => i + 1).slice(
        currentPage - 2,
        currentPage + 1,
      );
    }
    setPageNumbers(arrPagination);
  };

  const handlePageChange = async (pageNumber: number) => {
    const transactionHistory =
      (portfolioDetailStore.investFundTransactionHistory &&
        portfolioDetailStore.investFundTransactionHistory.slice()) ||
      [];
    const total = transactionHistory.length;
    const plus = total % TransactionHistoryContants.itemsPerPage ? 1 : 0;
    const count =
      Math.floor(total / TransactionHistoryContants.itemsPerPage) + plus;
    if (
      pageNumber ===
      portfolioDetailStore.investFundTransactionSelection.currentPage
    ) {
      return;
    }
    if (pageNumber < count && pageNumber > 0) {
      portfolioDetailStore.setInvestFundTransactionSelection(
        'currentPage',
        pageNumber,
      );
      resetPageNumbers();
    }

    if (pageNumber == count) {
      const startDate = portfolioDetailStore.investFundTransactionSelection
        .startDate
        ? dayjs(portfolioDetailStore.investFundTransactionSelection.startDate)
            .startOf('day')
            .format()
        : null;
      const endDate = portfolioDetailStore.investFundTransactionSelection
        .endDate
        ? dayjs(portfolioDetailStore.investFundTransactionSelection.endDate)
            .endOf('day')
            .format()
        : null;
      const data = await portfolioDetailStore.fetchInvestFundTransactionHistory(
        {
          itemsPerPage: TransactionHistoryContants.itemsPerPage,
          nextPage: pageNumber + 1,
          type: portfolioDetailStore.investFundTransactionSelection.type,
          startDate: startDate,
          endDate: endDate,
        },
      );
      if (data && data.length > 0) {
        transactionHistory.push(...data);
        portfolioDetailStore.setInvestFundTransactionHistory(
          transactionHistory,
        );
      }
      portfolioDetailStore.setInvestFundTransactionSelection(
        'currentPage',
        pageNumber,
      );
    }
  };

  const handleStartDateChange = async (
    value: any,
    keyboardInputValue?: string | undefined,
  ) => {
    portfolioDetailStore.setInvestFundTransactionSelection('startDate', value);
    await portfolioDetailStore.refreshInestFundTransactionHistory();
  };

  const handleEndDateChange = async (
    value: any,
    keyboardInputValue?: string | undefined,
  ) => {
    portfolioDetailStore.setInvestFundTransactionSelection('endDate', value);
    await portfolioDetailStore.refreshInestFundTransactionHistory();
  };

  const handleSelectedTypeChange = async (event: SelectChangeEvent) => {
    portfolioDetailStore.setInvestFundTransactionSelection(
      'type',
      event.target.value as any,
    );
    await portfolioDetailStore.refreshInestFundTransactionHistory();
  };

  const renderAmountWithCommas = (currencyCode: string, price: number) => {
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    return `${currencySymbol}${roundAndAddDotAndCommaSeparator(price, 4)}`;
  };

  const renderAssetTypeIcon = (assetType: AssetType | undefined) => {
    switch (assetType) {
      case AssetTypeName.cryptoCurrency:
        return <CurrencyBitcoinIcon fontSize={'medium'} />;
      case AssetTypeName.cash:
        return <BsCashCoin fontSize={'medium'} />;
      case AssetTypeName.stock:
        return <ShowChartIcon fontSize={'medium'} />;
      case AssetTypeName.realEstate:
        return <MapsHomeWorkIcon fontSize={'medium'} />;
      case AssetTypeName.bankSaving:
        return <AccountBalanceIcon fontSize={'medium'} />;
      case AssetTypeName.custom:
        return <RiPsychotherapyFill fontSize={'medium'} />;
      default:
        return <></>;
    }
  };

  return <>
    <Grid item lg={12} md={12} xl={12} xs={12}>
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
            alignItems: 'center',
            height: '5rem',
            boxShadow: 'none',
          }}
        >
          <CardHeader
            title={content.investFundTab.title}
            sx={{ padding: '0px', marginRight:'auto' }}
          />
          <FormControl
            sx={{
              minWidth: '6rem',
              height: '4rem',
              px: '.2rem',
              mt: '10px',
            }}
          >
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={
                portfolioDetailStore.investFundTransactionSelection.type ||
                'all'
              }
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
              mt: '10px',
              height: '4rem',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={'Start date'}
                inputFormat="dd/MM/yyyy"
                value={
                  portfolioDetailStore.investFundTransactionSelection.startDate
                }
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
                label={'End date'}
                inputFormat="dd/MM/yyyy"
                value={
                  portfolioDetailStore.investFundTransactionSelection.endDate
                }
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: '10rem' }} />
                )}
              />
            </LocalizationProvider>
          </Box>
          <IconButton
            onClick={resetTransaction}
            sx={{
              padding: '0px',
              color: '#CBCBCD',
              marginLeft: 'auto',
              width: '3rem',
              height: '3rem',
            }}
          >
            <GrPowerReset />
          </IconButton>
        </Card>
        <Box>
          <Table sx={{ overflowY: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableHeaderCell>{content.investFundTab.name}</TableHeaderCell>
                <TableHeaderCell sx={{ textAlign: 'center' }}>
                  {content.investFundTab.direction}
                </TableHeaderCell>
                <TableHeaderCell sx={{ textAlign: 'center' }}>
                  {content.investFundTab.amount}
                </TableHeaderCell>
                <TableHeaderCell sx={{ textAlign: 'left' }}>
                  {content.investFundTab.assetType}
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolioDetailStore.investFundTransactionHistory
                .slice(
                  (portfolioDetailStore.investFundTransactionSelection
                    .currentPage -
                    1) *
                    TransactionHistoryContants.itemsPerPage,
                  portfolioDetailStore.investFundTransactionSelection
                    .currentPage * TransactionHistoryContants.itemsPerPage,
                )
                .map((record: InvestFundTransactionItem, i) => {
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
                      <TableBodyCellSymbol>
                        <Box
                          sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                        >
                          {record.singleAssetTransactionType ===
                          TransactionRequestType.moveToFund
                            ? AssetTypeConstants[language][
                                record.destinationAssetType ||
                                  AssetTypeName.custom
                              ]
                            : AssetTypeConstants[language][
                                record.referentialAssetType ||
                                  AssetTypeName.custom
                              ]}
                        </Box>
                        <Box
                          sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                        >
                          {dayjs(record.createdAt).format('DD-MM-YYYY')}
                        </Box>
                      </TableBodyCellSymbol>

                      <TableBodyCellSymbol align="center">
                        {record.singleAssetTransactionType ===
                        TransactionRequestType.moveToFund ? (
                          <ImArrowLeft
                            fontSize="25"
                            color={colorScheme.red400}
                          />
                        ) : (
                          <ImArrowRight
                            fontSize="25"
                            color={colorScheme.green400}
                          />
                        )}
                      </TableBodyCellSymbol>
                      <TableBodyCellSymbol align="center">
                        {renderAmountWithCommas(
                          record.currencyCode,
                          record.amount,
                        )}
                      </TableBodyCellSymbol>
                      <TableBodyCellSymbol align="left">
                        {record.singleAssetTransactionType ===
                        TransactionRequestType.moveToFund ? (
                          <>
                            {renderAssetTypeIcon(
                              record.referentialAssetType ||
                                AssetTypeName.custom,
                            )}
                            &nbsp;&nbsp;
                            {capitalizeFirstLetter(
                              AssetTypeConstants[language][
                                record.referentialAssetType ||
                                  AssetTypeName.custom
                              ],
                            )}
                          </>
                        ) : (
                          <>
                            {renderAssetTypeIcon(
                              record.destinationAssetType ||
                                AssetTypeName.custom,
                            )}
                            &nbsp;&nbsp;
                            {capitalizeFirstLetter(
                              AssetTypeConstants[language][
                                record.destinationAssetType ||
                                  AssetTypeName.custom
                              ],
                            )}
                          </>
                        )}
                      </TableBodyCellSymbol>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={
              portfolioDetailStore.investFundTransactionSelection.currentPage
            }
            handleCurrentPage={handlePageChange}
          />
        </Box>
      </Card>
    </Grid>
  </>;
});

export default PDTransactionHistory;
