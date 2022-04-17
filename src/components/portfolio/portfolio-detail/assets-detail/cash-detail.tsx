import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getCurrencyByCode } from 'shared/helpers';
import SettingsMenuButton from './settings-menu-button';
import { CashItem } from 'shared/models';

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
  cashDetail: Array<CashItem> | undefined;
}

export const CashInvestments = ({ cashDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const { portfolioId } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = ['Total', ''];

  const renderCurrencyName = (code: string) => {
    if (code) {
      return getCurrencyByCode(code)?.name;
    } else return '';
  };

  const renderTotalCash = (num: number, code: string) => {
    return getCurrencyByCode(code)?.symbol.toString() + num.toString();
  };

  const handleItemClick = (assetId: number) => {
    router.push(
      `/portfolio/${portfolioId}/cash/${assetId.toString()}`,
      `/portfolio/${portfolioId}/cash/${assetId.toString()}`,
      { locale: locale },
    );
  };

  return cashDetail?.length ? (
    <Card
      sx={{
        height: '100%',
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
        <CardHeader title="Cash" sx={{ padding: '0px' }} />
        <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
          <MoreHorizIcon />
        </Button>
      </Card>
      {/* <Scrollbars autoHeight> */}
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Currency</TableHeaderCell>
                {headings.map((heading, i) => (
                  <TableHeaderCell key={i} sx={{ textAlign: 'right' }}>
                    {heading}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cashDetail.map((record, i) => {
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
                      onClick={() => handleItemClick(record.id)}
                    >
                      <Box sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                        {record.currencyCode}
                      </Box>
                      <Box
                        sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                      >
                        {renderCurrencyName(record.currencyCode)}
                      </Box>
                    </TableBodyCellSymbol>
                    <TableBodyCell onClick={() => handleItemClick(record.id)}>
                      {renderTotalCash(record.amount, record.currencyCode)}
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
  ) : (
    <></>
  );
};
