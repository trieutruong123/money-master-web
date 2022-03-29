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
  useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
  bankingDetail: Array<any>;
}

export const BankingInvestments = ({ bankingDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [
    'Deposit',
    'Interest Rate',
    'Term Range',
    'Sent Day',
  ];

  const renderDeposit = (num: number, code: string) => {
    return getCurrencyByCode(code)?.symbol.toString() + num.toString();
  };

  const renderInterestRate = (interestRate: number) => {
    const rate = interestRate*100
    return (
      <span style={{ color: '#0d6f3f' }}>{rate.toString() + '%'}</span>
    );
  };

  const renderTermRange = (termRange: number, unit: string) => {
    return termRange.toString() + ' ' + unit;
  };

  const renderSentDay = (inputDay: string) => {
    const timestamp = Date.parse(inputDay);
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    const originalDate = todate + '/' + tomonth + '/' + toyear;
    return originalDate;
  };

  return bankingDetail.length ? (
    <Grid item lg={12} md={12} xl={12} xs={12}  mt="1rem">
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
          <CardHeader title="Banking" sx={{ padding: '0px' }} />
          <Button sx={{ padding: '0px', color: '#CBCBCD' }}>
            <MoreHorizIcon />
          </Button>
        </Card>
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                  {headings.map((heading, i) => (
                    <TableHeaderCell key={i} sx={{ textAlign: 'right' }}>
                      {heading}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bankingDetail.map((record, i) => {
                  return (
                    <TableRow
                      onClick={() => {
                        router.push(
                          `/portfolio/asset-detail/test`,
                          `/portfolio/asset-detail/test`,
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
                          {record.name}
                        </Box>
                      </TableBodyCellSymbol>
                      <TableBodyCell>
                        {renderDeposit(
                          record.inputMoneyAmount,
                          record.inputCurrency,
                        )}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderInterestRate(record.interestRate)}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderTermRange(record.termRange, 'months')}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderSentDay(record.inputDay)}
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
