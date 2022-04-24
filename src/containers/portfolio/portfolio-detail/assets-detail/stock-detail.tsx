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
  Tooltip,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { roundAndAddDotAndCommaSeparator } from 'utils';
import { StockItem } from 'shared/models';
import SettingsMenuButton from './settings-menu-button';
import { getCurrencyByCode } from 'shared/helpers';

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
  stockDetail: Array<StockItem> | undefined;
}

export const StockInvestments = ({ stockDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const { portfolioId } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [
    'Current Price',
    // "Today's Change",
    // "Today's Gain/Loss"
    "Today's Change",
    'Total P/L',
    'Shares',
    'Total',
    '',
  ];
  const renderPriceWithCommas = (currencyCode:string,price: number) => {
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    return currencySymbol + price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const renderPriceChange = (currencyCode:string,num: number) => {
    let val: string = '';
    // const num = parseFloat(number);
    const number = roundAndAddDotAndCommaSeparator(num,4).toString();
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    if (typeof num !== 'undefined') {
      if (num < 0) {
        val = `-${currencySymbol}${number.slice(1)}`;
        return <span style={{ color: '#e01616' }}>{val}</span>;
      } else {
        val = `+${currencySymbol}${number}`;
        return <span style={{ color: '#0d6f3f' }}>{val}</span>;
      }
    }
    return undefined;
  };

  const renderPercentage = (num: number) => {
    // const num = parseFloat(number);
    const number = roundAndAddDotAndCommaSeparator(num,4).toString();
    if (typeof num !== 'undefined') {
      if (num < 0)
        return <span style={{ color: '#e01616' }}>&#40;{number}%&#41;</span>;
      else
        return (
          <span style={{ color: '#0d6f3f' }}>&#40;&#43;{number}%&#41;</span>
        );
    } else return undefined;
  };

  const renderTotal = (currencyCode:string,price: number, shares: number) => {
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    return currencySymbol+ roundAndAddDotAndCommaSeparator(price * shares, 4);
  };

  const handleItemClick = (assetId: string) => {
    router.push(
      `/portfolio/${portfolioId}/stock/${assetId.toUpperCase()}`,
      `/portfolio/${portfolioId}/stock/${assetId.toUpperCase()}`,
      { locale: locale },
    );
  };

  return stockDetail?.length ? (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
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
          <CardHeader title="Stock" sx={{ padding: '0px' }} />
          <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
            <MoreHorizIcon />
          </Button>
        </Card>
        {/* <Scrollbars autoHeight> */}
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
              {stockDetail.map((record, i) => {
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
                    <TableBodyCellSymbol
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      <Box sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                        {record.stockCode}
                      </Box>
                      <Box
                        sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                      >
                        {record.marketCode}
                      </Box>
                    </TableBodyCellSymbol>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {renderPriceWithCommas(record.currencyCode,record.currentPrice)}
                    </TableBodyCell>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {/* {renderPriceChange(record.priceChange)}&nbsp;
                      {renderPercentage(record.percentChange)} */}
                      {renderPriceChange(record.currencyCode,
                        record.currentAmountHolding *
                          (record.currentPrice - record.purchasePrice),
                      )}
                      &nbsp;
                      {renderPercentage(
                        (record.currentPrice - record.purchasePrice) /
                          record.purchasePrice,
                      )}
                    </TableBodyCell>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {/* {renderPriceChange(record.profitLossAmount)} */}
                      {renderPriceChange(record.currencyCode,
                        record.currentAmountHolding *
                          (record.currentPrice - record.purchasePrice),
                      )}
                    </TableBodyCell>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {record.currentAmountHolding}
                    </TableBodyCell>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {renderTotal(
                        record.currencyCode,
                        record.currentPrice,
                        record.currentAmountHolding,
                      )}
                    </TableBodyCell>
                    <TableBodyCell>
                      <SettingsMenuButton />
                    </TableBodyCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {/* </Scrollbars> */}
      </Card>
    </Grid>
  ) : (
    <></>
  );
};
