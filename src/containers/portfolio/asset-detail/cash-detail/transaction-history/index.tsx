import {
  CardContent,
  Card,
  Grid,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  GridCellParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { GiBuyCard, GiSellCard, GiReceiveMoney,GiTransform } from 'react-icons/gi';
import { CustomNoRowsOverlay } from 'shared/components';
import { precisionRound } from 'utils/number';
import SettingsMenuButton from './settings-menu-button';

const columns: GridColDef[] = [
  {
    field: 'time',
    headerName: 'Purchase Date',
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.value).format('MMM DD YYYY HH:mm')}`,
  },
  {
    field: 'type',
    headerName: 'Transaction',
    sortable: false,
    filterable: false,
    width: 140,
    editable: true,
    renderCell: (params: GridCellParams) => {
      switch (params.row.type) {
        case 'newAsset':
        case 'buy':
          return (
            <Chip
              label="BUY"
              variant="filled"
              avatar={<GiBuyCard color="white" />}
              sx={{ backgroundColor: 'success.light' }}
            />
          );
        case 'moveToFund':
          return (
            <Chip
              label="SELL"
              variant="filled"
              avatar={<GiSellCard color="white" />}
              sx={{ backgroundColor: 'error.light' }}
            />
          );

        case 'withdrawValue':
          return (
            <Chip
              label="TRANSFER"
              variant="filled"
              avatar={<GiTransform color="white" />}
              sx={{ backgroundColor: 'warning.light' }}
            />
          );  
      }
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 130,
    editable: false,
  },
  {
    field: 'desName',
    headerName: 'Transaction To',
    width: 130,
    editable: false,
    renderCell: (params: GridCellParams) => {
      switch (params.row.desName) {
        case null:
          return "N/A"
      }
    }
  },
  {
    field: 'desType',
    headerName: 'Destination Type',
    width: 130,
    editable: false,
    renderCell: (params: GridCellParams) => {
      switch (params.row.desType) {
        case null:
          return "N/A"
      }
    }
  },
  {
    field: 'currencyCode',
    headerName: 'Currency',
    width: 130,
    editable: false,
  },
  // {
  //   field: 'price',
  //   headerName: 'Price',
  //   width: 90,
  //   editable: false,
  //   valueGetter: (params: GridValueGetterParams) => `$${params.row.price}`,
  // },
  // {
  //   field: 'fee',
  //   headerName: 'Fee',
  //   width: 80,
  //   editable: false,
  //   valueGetter: (params: GridValueGetterParams) => `$${params.row.fee}`,
  // },
  // {
  //   field: 'totalCost',
  //   headerName: 'Total Cost',
  //   width: 100,
  //   editable: false,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `$${params.row.amount * params.row.price - params.row.fee}`,
  // },
  // {
  //   field: 'netValue',
  //   headerName: 'Net Value',
  //   width: 90,
  //   editable: false,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `$${params.row.netValue * params.row.amount}`,
  // },
  // {
  //   field: 'netPL',
  //   headerName: 'Net P/L',
  //   width: 160,
  //   editable: false,
  //   renderCell: (params: GridCellParams) => {
  //     const netValue = params.row.netValue * params.row.amount;
  //     const purchasePrice =
  //       params.row.amount * params.row.price - params.row.fee;
  //     switch (params.row.type) {
  //       case 'buy':
  //         return (
  //           <NetPLCell firstValue={purchasePrice} secondValue={netValue} />
  //         );
  //       case 'sell':
  //         return (
  //           <NetPLCell firstValue={netValue} secondValue={purchasePrice} />
  //         );
  //     }
  //   },
  // },
  {
    field: 'settings',
    headerName: 'Settings',
    sortable: false,
    filterable: false,
    width: 80,
    renderCell: (params: GridCellParams) => {
      return <SettingsMenuButton />;
    },
  },
];

const rows = [
  {
    id: 1647501595399,
    time: 1647501595399,
    type: 'buy',
    amount: 43,
    price: 41000,
    fee: 43,
    netValue: 0,
    settings: 0,
  },
  {
    id: 1647501595310,
    time: 1647501595310,
    type: 'sell',
    amount: 43,
    price: 41000,
    fee: 43,
    netValue: 0,
    settings: 0,
  },
  {
    id: 1647501595311,
    time: 1647501595311,
    type: 'dividend',
    amount: 43,
    price: 41000,
    fee: 43,
    netValue: 0,
    settings: 0,
  },
];
interface IProps {
  assetMarketData: any;
  transactionHistoryData: any
}

const TransactionHistory = ({ assetMarketData, transactionHistoryData }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const marketData = assetMarketData.market_data;
  const customizedRow = transactionHistoryData.map((transaction:any) => {
    return { 
      id:transaction.id,
      time:transaction.createdAt,
      amount:transaction.amount,
      desId:transaction.destinationAssetId,
      desName:transaction.destinationAssetName,
      desType:transaction.destinationAssetType,
      currencyCode:  transaction.currencyCode,
      type:transaction.singleAssetTransactionType
    };
  });
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
              rows={customizedRow}
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
  firstValue: number;
  secondValue: number;
}

function NetPLCell({ firstValue, secondValue }: NetPLCellProps) {
  const weight = secondValue - firstValue;
  const profitLoss = precisionRound((weight / firstValue) * 100, 4);
  const dollarSign = '$';
  return (
    <Typography
      variant="body1"
      color={weight < 0 ? 'error.main' : 'success.main'}
    >
      {weight > 0 ? '+' : '-'}
      {dollarSign}
      {weight < 0 ? weight.toString().slice(1) : weight} (
      {weight > 0 ? '+' : ''}
      {profitLoss}%)
    </Typography>
  );
}

export default TransactionHistory;