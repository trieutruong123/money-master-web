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
import { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { precisionRound } from 'utils/number';
import { getCurrencyByCode } from 'helpers';

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
  cryptoDetail: Array<any>|undefined;
}

export const CryptoInvestments = ({ cryptoDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [
    'Price',
    "Today's Price Change",
    "Today's % Change",
    "Today's Gain/Loss",
    'Shares',
    'Total',
  ];
  const renderPriceWithCommas = (price: number) => {
    return '$' + price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const renderPriceChange = (num: number) => {
    let val: string = '';
    if (typeof num !== 'undefined') {
      if (num < 0) {
        val = `-$${precisionRound(num, 3).toString().slice(1)}`;
        return <span style={{ color: '#e01616' }}>{val}</span>;
      } else {
        val = `$${precisionRound(num, 3).toString().slice(1)}`;
        return <span style={{ color: '#0d6f3f' }}>{val}</span>;
      }
    } else return undefined;
  };

  const renderPercentage = (num: number) => {
    if (typeof num !== 'undefined') {
      if (num < 0)
        return (
          <span style={{ color: '#e01616' }}>{precisionRound(num, 3)}%</span>
        );
      else
        return (
          <span style={{ color: '#0d6f3f' }}>{precisionRound(num, 3)}%</span>
        );
    } else return undefined;
  };

  const renderTotalValue = (num: number, code: string) => {
    return (
      getCurrencyByCode(code)?.symbol.toString() +
      precisionRound(num, 3).toString()
    );
  };

  return cryptoDetail?.length ? (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px 0px 0px 10px':'5px 20px 20px 20px',
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
          <CardHeader title="Crypto" sx={{ padding: '0px' }} />
          <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
            <MoreHorizIcon />
          </Button>
        </Card>
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Symbol</TableHeaderCell>
                  {headings.map((heading, i) => (
                    <TableHeaderCell key={i} sx={{ textAlign: 'right' }}>
                      {heading}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptoDetail.map((record, i) => {
                  return (
                    <TableRow
                      onClick={() => {
                        // router.push(
                        //   `/portfolio/asset-detail/${record.coinName}`,
                        //   `/portfolio/asset-detail/${record.coinName}`,
                        //   { locale: locale },
                        // );
                        router.push(
                          `/portfolio/coin/test`,
                          `/portfolio/coin/test`,
                          { locale: locale },
                        );
                      }}
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
                          {record.symbol}
                        </Box>
                        <Box
                          sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                        >
                          {record.description}
                        </Box>
                      </TableBodyCellSymbol>
                      <TableBodyCell>
                        {renderPriceWithCommas(record.price)}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderPriceChange(record.priceChange)}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderPercentage(record.percentChange)}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderPriceChange(record.profitLossAmount)}
                      </TableBodyCell>
                      <TableBodyCell>{record.quantity}</TableBodyCell>
                      <TableBodyCell>
                        {renderTotalValue(
                          record.totalValue,
                          record.currencyCode,
                        )}
                      </TableBodyCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </Grid>
  ) : (
    <></>
  );
};
