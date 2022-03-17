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
  realEstateDetail: Array<any>;
}

export const RealEstateInvesments = ({ realEstateDetail }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();

  const headings = [ 'Valuation', 'Area', 'Address'];

  const renderValuation = (num: number, code: string) => {
    return getCurrencyByCode(code)?.symbol.toString() + num.toString();
  };

  const renderAddress = (address: any) => {
    return address.toString().slice(0, 25) + '...';
  };

  return realEstateDetail.length ? (
    <Grid item xl={8} lg={8} md={8} sm={8} xs={12}  mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: '5px 20px 20px 20px',
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
                      </TableBodyCellSymbol>
                      <TableBodyCell>
                        {renderValuation(record.valuation, record.currencyCode)}
                      </TableBodyCell>
                      <TableBodyCell>{record.area}</TableBodyCell>
                      <Tooltip title={record.address}>
                        <TableBodyCell>
                          {renderAddress(record.address)}
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
    </Grid>
  ) : (
    <></>
  );
};
