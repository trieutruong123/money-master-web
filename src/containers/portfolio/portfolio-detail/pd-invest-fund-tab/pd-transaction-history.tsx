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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { capitalizeFirstLetter, colorScheme, roundAndAddDotAndCommaSeparator } from 'utils';
import { getCurrencyByCode } from 'shared/helpers';
import dayjs from 'dayjs';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { InvestFundTransactionItem } from 'shared/models';
import { AssetType } from 'shared/types';
import { AssetTypeConstants, AssetTypeName } from 'shared/constants';
import { BsCashCoin } from 'react-icons/bs';
import { RiPsychotherapyFill } from 'react-icons/ri';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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
  transactionHistory: Array<InvestFundTransactionItem> | undefined;
}

const PDTransactionHistory = ({ transactionHistory }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //const { collumnsName, settingDropDownMenu } = content;
  const headings = [
    // "Today's Change",
    // "Today's Gain/Loss"
    'Ammount',
    'Direction',
    'Asset Type',
    '',
  ];

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

  return transactionHistory?.length ? (
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
            height: '3rem',
            boxShadow: 'none',
          }}
        >
          <CardHeader title="Transaction history" sx={{ padding: '0px' }} />
          <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
            <MoreHorizIcon />
          </Button>
        </Card>
        <Box>
          <Table sx={{ overflowY: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableHeaderCell>{'Name'}</TableHeaderCell>
                <TableHeaderCell sx={{ textAlign: 'center' }}>
                  {'Direction'}
                </TableHeaderCell>
                <TableHeaderCell sx={{ textAlign: 'center' }}>
                  {'Amount'}
                </TableHeaderCell>

                <TableHeaderCell sx={{ textAlign: 'left' }}>
                  {'Asset Type'}
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionHistory.map((record, i) => {
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
                      <Box sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                        {record.referentialAssetName}
                      </Box>
                      <Box
                        sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                      >
                        {dayjs(record.createdAt).format('DD-MM-YYYY')}
                      </Box>
                    </TableBodyCellSymbol>

                    <TableBodyCellSymbol align="center">
                      {!record.isIngoing ? (
                        <ImArrowLeft fontSize="25" color={colorScheme.red400} />
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
                      {renderAssetTypeIcon(record.referentialAssetType)}
                      &nbsp;&nbsp;
                      {capitalizeFirstLetter(
                        AssetTypeConstants[
                        record.referentialAssetType || AssetTypeName.custom
                        ],
                      )}
                    </TableBodyCellSymbol>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Grid>
  ) : (
    <></>
  );
};

export default PDTransactionHistory;
