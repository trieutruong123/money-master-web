import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { cryptoCurrencyData } from './crypto-currency-data';

export const CryptoCurrencyListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>24h %</TableCell>
                  <TableCell>7d %</TableCell>
                  <TableCell>Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptoCurrencyData.slice(0, limit).map((coin) => (
                  <TableRow hover key={coin.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Avatar src={coin.imgUrl} sx={{ mr: 2 }}></Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {coin.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{coin.price}</TableCell>
                    <TableCell>
                      <Box
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {coin.isNegativeRateIn24h ? (
                          <ArrowDropDownIcon sx={{ color: 'error.main' }} />
                        ) : (
                          <ArrowDropUpIcon sx={{ color: 'success.main' }} />
                        )}{' '}
                        <Typography
                          color={
                            coin.isNegativeRateIn24h
                              ? 'error.main'
                              : 'success.main'
                          }
                          variant="body1"
                        >
                          {coin.profitRateIn24h}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {coin.isNegativeRateIn7d ? (
                          <ArrowDropDownIcon sx={{ color: 'error.main' }} />
                        ) : (
                          <ArrowDropUpIcon sx={{ color: 'success.main' }} />
                        )}{' '}
                        <Typography
                          color={
                            coin.isNegativeRateIn7d
                              ? 'error.main'
                              : 'success.main'
                          }
                          variant="body1"
                        >
                          {coin.profitRateIn7d}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{coin.marketCap}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={cryptoCurrencyData.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10]}
        />
      </Card>
    </Grid>
  );
};
