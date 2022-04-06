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
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getCurrencyByCode } from 'helpers';
import { RealEstateItem } from 'types';
import dayjs from 'dayjs';

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
  realEstateDetail: Array<RealEstateItem> | undefined;
}

export const RealEstateInvesments = ({ realEstateDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headings = ['Buy Price', 'Current Price', , 'Description'];

  const renderValuation = (num: number, code: string) => {
    const currencySymbol = getCurrencyByCode(
      code.toUpperCase(),
    )?.symbol.toString();
    return typeof currencySymbol !== 'undefined'
      ? currencySymbol + num.toString()
      : num.toString();
  };

  const renderDescription = (description: any) => {
    return description.toString().slice(0, 25) + '...';
  };

  return realEstateDetail?.length ? (
      <Card
        sx={{
          height:'100%',
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
          <CardHeader title="Real Estate" sx={{ padding: '0px' }} />
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
                {realEstateDetail.map((record, i) => {
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
                        <Box
                          sx={{ color: '#4c4c4c', textTransform: 'uppercase' }}
                        >
                          {dayjs(record.inputDay).format('DD-MM-YYYY')}
                        </Box>
                      </TableBodyCellSymbol>
                      <TableBodyCell>
                        {renderValuation(
                          record.inputMoneyAmount,
                          record.inputCurrency,
                        )}
                      </TableBodyCell>
                      <TableBodyCell>
                        {renderValuation(
                          record.currentPrice,
                          record.inputCurrency,
                        )}
                      </TableBodyCell>
                      <Tooltip title={record.description}>
                        <TableBodyCell>
                          {renderDescription(record.description)}
                        </TableBodyCell>
                      </Tooltip>
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
