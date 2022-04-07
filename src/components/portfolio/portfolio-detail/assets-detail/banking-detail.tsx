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
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getCurrencyByCode } from 'helpers';
import { BankSavingItem } from 'types';
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
  bankingDetail: Array<BankSavingItem> | undefined;
}

export const BankingInvestments = ({ bankingDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const { portfolioId } = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = [
    'Deposit',
    'Interest Rate',
    'Term Range',
    'Description',
    '',
  ];

  const renderDeposit = (num: number, code: string) => {
    const currencySymbol = getCurrencyByCode(
      code.toUpperCase(),
    )?.symbol.toString();
    return typeof currencySymbol !== 'undefined'
      ? currencySymbol + num.toString()
      : num.toString();
  };

  const renderInterestRate = (interestRate: number) => {
    const rate = interestRate;
    return <span style={{ color: '#0d6f3f' }}>{rate.toString() + '%'}</span>;
  };

  const renderTermRange = (termRange: number, unit: string) => {
    const years = Math.floor(termRange / 12);
    const months = termRange % 12;
    const displayText = `${
      years > 1 ? years + ' years ' : years === 1 ? years + ' year ' : ''
    }${years > 0 && months !== 0 ? '& ' : ''}${
      months > 1 ? months + ' months' : months === 1 ? '1 month' : ''
    }`;
    return displayText;
  };

  const renderDescription = (description: any) => {
    return description.toString().slice(0, 25) + '...';
  };

  const handleItemClick = (assetId: number) => {
    router.push(
      `/portfolio/${portfolioId}/savings/${assetId
        .toString()
        .toUpperCase()}`,
      `/portfolio/${portfolioId}/savings/${assetId
        .toString()
        .toUpperCase()}`,
      { locale: locale },
    );
  };

  return bankingDetail?.length ? (
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
        <CardHeader title="Bank Savings" sx={{ padding: '0px' }} />
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
                        {record.name}
                      </Box>
                      <Box
                        sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                      >
                        {dayjs(record.inputDay).format('DD-MM-YYYY')}
                      </Box>
                    </TableBodyCellSymbol>
                    <TableBodyCell onClick={() => handleItemClick(record.id)}>
                      {renderDeposit(
                        record.inputMoneyAmount,
                        record.inputCurrency,
                      )}
                    </TableBodyCell>
                    <TableBodyCell onClick={() => handleItemClick(record.id)}>
                      {renderInterestRate(record.interestRate)}
                    </TableBodyCell>
                    <TableBodyCell onClick={() => handleItemClick(record.id)}>
                      {renderTermRange(record.termRange, 'months')}
                    </TableBodyCell>
                    <Tooltip title={record.description}>
                      <TableBodyCell onClick={() => handleItemClick(record.id)}>
                        {renderDescription(record.description)}
                      </TableBodyCell>
                    </Tooltip>
                    <TableBodyCell>
                      <SettingsMenuButton />
                    </TableBodyCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  ) : (
    <></>
  );
};
