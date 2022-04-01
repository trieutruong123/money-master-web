import Image from 'next/image';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from 'components/shared';

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    imgUrl: '/crypto-currencies/Bitcoin.png',
    amount: '0.001',
    product: {
      name: 'Bitcoin',
    },
    createdAt: 1555016400000,
    status: 'pending',
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    imgUrl: '/crypto-currencies/Ethereum.png',
    amount: 2.34,
    product: {
      name: 'Ethereum',
    },
    createdAt: 1555016400000,
    status: 'pending',
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    imgUrl: '/crypto-currencies/BNB.png',
    amount: '2.99',
    product: {
      name: 'BNB',
    },
    createdAt: 1554930000000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    imgUrl: '/stocks/Apple.png',
    amount: '11.00',
    product: {
      name: 'Apple Stocks',
    },
    createdAt: 1554757200000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    imgUrl: '/stocks/tesla.png',
    amount: '5.00',
    product: {
      name: 'Tesla Stocks',
    },
    createdAt: 1554670800000,
    status: 'delivered',
  },
];

export const RecentlyAdded = (props: any) => (
  <Card {...props}>
    <CardHeader title="Recently Added" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Img</TableCell>
              <TableCell>Product</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>
                  <Image
                    alt="alt"
                    src={order.imgUrl}
                    height={'48'}
                    width={'48'}
                  />
                </TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{format(order.createdAt, 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (order.status === 'delivered' && 'success.main') ||
                      (order.status === 'refunded' && 'error.main') ||
                      'warning.main'
                    }
                  >
                    {order.amount}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
