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
import { CustomNoRowsOverlay, TransactionTypeIcon } from 'shared/components';
import { TransactionTypeName } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';

const columns: GridColDef[] = [
  {
    field: 'createAt',
    headerName: 'Date',
    width: 140,
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.row.createdAt).format('MMM DD YYYY HH:mm')}`,
  },
  {
    field: 'singleAssetTransactionType',
    headerName: 'Transaction',
    sortable: false,
    filterable: false,
    width: 120,
    editable: true,
    renderCell: (params: GridCellParams) => {
      switch (params.row.type) {
        case TransactionTypeName.AddValue:
          return (
            <Chip
              label="BUY"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionTypeName.AddValue}
                  color="white"
                />
              }
              sx={{ backgroundColor: 'success.light' }}
            />
          );
        case TransactionTypeName.SellAsset:
          return (
            <Chip
              label="SELL"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionTypeName.SellAsset}
                  color="white"
                />
              }
              sx={{ backgroundColor: 'error.light' }}
            />
          );
        case TransactionTypeName.MoveToFund:
          return (
            <Chip
              label="MOVE TO FUND"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionTypeName.MoveToFund}
                  color="white"
                />
              }
              sx={{ backgroundColor: 'warning.light' }}
            />
          );
        case TransactionTypeName.NewAsset:
          return (
            <Chip
              label="Create"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionTypeName.NewAsset}
                  color="white"
                />
              }
              sx={{ backgroundColor: 'main.light' }}
            />
          );
        case TransactionTypeName.WithdrawValue:
          return (
            <Chip
              label="Create"
              variant="filled"
              avatar={
                <TransactionTypeIcon
                  transactionType={TransactionTypeName.WithdrawValue}
                  color="white"
                />
              }
              sx={{ backgroundColor: 'main.light' }}
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
        params.row.purchasePrice
      }`,
  },
  {
    field: 'amount',
    headerName: 'Fee',
    width: 80,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${getCurrencyByCode(params.row.currencyCode)?.symbol || ''}${
        params.row.fee
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
      }${precisionRound(params.row.totalCost, 4)}`,
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
  transactionHistoryData: Array<any> | undefined;
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
