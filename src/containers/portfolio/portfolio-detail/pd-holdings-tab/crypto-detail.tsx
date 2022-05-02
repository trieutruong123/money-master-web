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
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { roundAndAddDotAndCommaSeparator } from 'utils';
import { getCurrencyByCode } from 'shared/helpers';
import { CryptoItem } from 'shared/models';
import { AssetType } from 'shared/types';
import { AssetTypeName } from 'shared/constants';
import SettingsMenuButton from './settings-menu-button';

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
  cryptoDetail: Array<CryptoItem> | undefined;
  content: any;
  deleteAsset: (
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) => void;
  transferAssetToInvestFund: (
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) => void;
}

export const CryptoInvestments = ({
  cryptoDetail,
  content,
  deleteAsset,
  transferAssetToInvestFund,
}: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const { portfolioId } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { collumnsName, settingDropDownMenu } = content;
  const headings = [
    collumnsName.currentPrice,
    // "Today's Change",
    // "Today's Gain/Loss"
    collumnsName.todayChange,
    collumnsName.totalPL,
    collumnsName.shares,
    collumnsName.total,
    '',
  ];
  const renderPriceWithCommas = (currencyCode: string, price: number) => {
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    return (
      currencySymbol + price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
  };

  const renderPriceChange = (currencyCode: string, num: number) => {
    let val: string = '';
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    if (typeof num !== 'undefined') {
      if (num < 0) {
        val = `-${currencySymbol}${roundAndAddDotAndCommaSeparator(num, 4)
          .toString()
          .slice(1)}`;
        return <span style={{ color: '#e01616' }}>{val}</span>;
      } else {
        val = `+${currencySymbol}${roundAndAddDotAndCommaSeparator(
          num,
          4,
        ).toString()}`;
        return <span style={{ color: '#0d6f3f' }}>{val}</span>;
      }
    } else return undefined;
  };

  const renderPercentage = (num: number) => {
    if (typeof num !== 'undefined') {
      if (num < 0)
        return (
          <span style={{ color: '#e01616' }}>
            &#40;{roundAndAddDotAndCommaSeparator(num, 4)}%&#41;
          </span>
        );
      else
        return (
          <span style={{ color: '#0d6f3f' }}>
            &#40;&#43;{roundAndAddDotAndCommaSeparator(num, 4)}%&#41;
          </span>
        );
    } else return undefined;
  };

  const renderTotalValue = (currencyCode: string, num: number) => {
    const currencySymbol = getCurrencyByCode(currencyCode)?.symbol;
    return currencySymbol + roundAndAddDotAndCommaSeparator(num, 4).toString();
  };

  const handleItemClick = (assetId: string) => {
    router.push(
      `/portfolio/${portfolioId}/coin/${assetId.toLowerCase()}`,
      `/portfolio/${portfolioId}/coin/${assetId.toLowerCase()}`,
      { locale: locale },
    );
  };

  return cryptoDetail?.length ? (
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
          <CardHeader title="Crypto" sx={{ padding: '0px' }} />
          <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
            <MoreHorizIcon />
          </Button>
        </Card>
        {/* <Scrollbars autoHeight> */}
        <Box>
          <Table sx={{ overflowY: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableHeaderCell>{collumnsName.symbol}</TableHeaderCell>
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
                        {record.cryptoCoinCode}
                      </Box>
                      <Box
                        sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                      >
                        {record.name}
                      </Box>
                    </TableBodyCellSymbol>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {renderPriceWithCommas(
                        record.currencyCode,
                        record.currentPrice,
                      )}
                    </TableBodyCell>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {/* {renderPriceChange(record.priceChange)}&nbsp;
                        {renderPercentage(record.percentChange)} */}
                      {renderPriceChange(
                        record.currencyCode,
                        record.currentAmountHolding *
                          (record.currentPrice - record.purchasePrice),
                      )}
                      &nbsp;
                      {renderPercentage(
                        (record.currentPrice - record.purchasePrice) /
                          record.currentPrice,
                      )}
                    </TableBodyCell>
                    <TableBodyCell
                      onClick={() => handleItemClick(record.id.toString())}
                    >
                      {/* {renderPriceChange(record.profitLossAmount)} */}
                      {renderPriceChange(
                        record.currencyCode,
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
                      {renderTotalValue(
                        record.currencyCode,
                        record.currentPrice * record.currentAmountHolding,
                      )}
                    </TableBodyCell>
                    <TableBodyCell>
                      <SettingsMenuButton
                        assetType={AssetTypeName.cryptoCurrency}
                        assetId={record.id.toString()}
                        portfolioId={
                          Array.isArray(portfolioId)
                            ? portfolioId[0]
                            : portfolioId || ''
                        }
                        content={settingDropDownMenu}
                        deleteAsset={deleteAsset}
                        transferAssetToInvestFund={transferAssetToInvestFund}
                      />
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
