import {
  CardContent,
  Card,
  Grid,
  Box,
  Chip,
  Typography,
  useTheme,
  Stack,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  GridCellParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { precisionRound } from 'utils/number';
import SettingsMenuButton from './settings-menu-button';
import { TransactionItemType } from 'shared/constants';
import { CustomNoRowsOverlay, TransactionTypeIcon } from 'shared/components';
import { getCurrencyByCode } from 'shared/helpers';
import { StockTransactionList } from 'shared/models';

const columns: GridColDef[] = [
  {
    field: 'createAt',
    headerName: 'Date',
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.row.createdAt).format('MMM DD YYYY HH:mm')}`,
  },
  {
    field: 'singleAssetTransactionType',
    headerName: 'Transaction',
    sortable: false,
    filterable: false,
    width: 140,
    editable: true,
    renderCell: (params: GridCellParams) => {
      switch (params.row.singleAssetTransactionType) {
        case TransactionItemType.AddValue:
          return (
            <Chip
              label="BUY"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionItemType.AddValue}
                  color="white"
                  style={{ width: '25%', height: '80%', py: '0.2rem' }}
                />
              }
              sx={{
                backgroundColor: 'main.light',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            />
          );
        case TransactionItemType.SellAsset:
          return (
            <Chip
              label="SELL"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionItemType.SellAsset}
                  color="white"
                  style={{ width: '25%', height: '80%', py: '0.2rem' }}
                />
              }
              sx={{
                backgroundColor: 'main.light',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            />
          );
        case TransactionItemType.MoveToFund:
          return (
            <Chip
              label="MOVE TO FUND"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionItemType.MoveToFund}
                  color="white"
                  style={{ width: '25%', height: '80%', py: '0.2rem' }}
                />
              }
              sx={{
                backgroundColor: 'main.light',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            />
          );
        case TransactionItemType.NewAsset:
          return (
            <Chip
              label="Create"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionItemType.NewAsset}
                  color="black"
                  style={{ width: '25%', height: '80%', py: '0.2rem' }}
                />
              }
              sx={{
                backgroundColor: 'main.light',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            />
          );
        case TransactionItemType.WithdrawValue:
          return (
            <Chip
              label="Withdraw"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionItemType.WithdrawValue}
                  color="black"
                  style={{ width: '25%', height: '80%', py: '0.2rem' }}
                />
              }
              sx={{
                backgroundColor: 'main.light',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            />
          );
        default:
          return <></>;
      }
    },
  },
  {
    field: 'amount',
    headerName: 'Holdings',
    width: 70,
    editable: false,
  },
  {
    field: 'amount',
    headerName: 'Purchase Price',
    width: 115,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${getCurrencyByCode(params.row.currencyCode)?.symbol || ''}${
        params.row.amount
      }`,
  },
  {
    field: 'amount',
    headerName: 'Fee',
    width: 80,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${getCurrencyByCode(params.row.currencyCode)?.symbol || ''}${
        params.row.amount
      }`,
  },
  {
    field: 'totalCost',
    headerName: 'Total Cost',
    width: 100,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${
        getCurrencyByCode(params.row.currencyCode)?.symbol || ''
      }${precisionRound(params.row.amount, 4)}`,
  },
  {
    field: 'totalPL',
    headerName: 'P/L',
    width: 160,
    editable: false,
    renderCell: (params: GridCellParams) => {
      const { amount } = params.row;
      return <NetPLCell totalPL={amount} PLPercentage={amount * 1.1} />;
    },
  },
  {
    field: 'settings',
    headerName: '',
    sortable: false,
    filterable: false,
    width: 80,
    renderCell: (params: GridCellParams) => {
      return <SettingsMenuButton />;
    },
  },
];

interface IProps {
  transactionHistoryData: StockTransactionList | undefined;
}

export const TransactionHistory = ({ transactionHistoryData }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px' : '5px 20px 20px 20px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: 'none',
          }}
        >
          <CardContent
            sx={{
              height: 400,
              width: '100%',
              padding: isMobile ? '32px 0px' : 'initial',
            }}
          >
            <DataGrid
              rows={transactionHistoryData || []}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};

interface NetPLCellProps {
  totalPL: number;
  PLPercentage: number;
}

function NetPLCell({ totalPL, PLPercentage }: NetPLCellProps) {
  const dollarSign = '$';
  const displayText = `${totalPL > 0 ? '+' : '-'}${dollarSign}${
    totalPL < 0
      ? precisionRound(totalPL, 4).toString().slice(1)
      : precisionRound(totalPL, 4)
  } (${PLPercentage > 0 ? '+' : '-'}${
    PLPercentage < 0
      ? precisionRound(PLPercentage * 100, 4)
          .toString()
          .slice(1)
      : precisionRound(PLPercentage * 100, 4)
  }%)`;
  return (
    <Tooltip title={displayText}>
      <Stack spacing={0.5} direction="row">
        <Typography
          variant="body2"
          color={totalPL < 0 ? 'error.main' : 'success.main'}
        >
          {displayText}
        </Typography>
      </Stack>
    </Tooltip>
  );
}
