import {
  CardContent,
  Card,
  Grid,
  Box,
  Chip,
  Typography,
  useTheme,
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
import PerfrectScrollbar from 'react-perfect-scrollbar';
import { GiBuyCard, GiSellCard, GiReceiveMoney } from 'react-icons/gi';
import { precisionRound } from 'utils/number';
import SettingsMenuButton from './settings-menu-button';

const columns: GridColDef[] = [
  {
    field: 'time',
    headerName: 'Purchase Date',
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.id).format('MMM DD YYYY HH:mm')}`,
  },
  {
    field: 'type',
    headerName: 'Transaction',
    sortable: false,
    filterable: false,
    width: 120,
    editable: true,
    renderCell: (params: GridCellParams) => {
      switch (params.row.type) {
        case 'buy':
          return (
            <Chip
              label="BUY"
              variant="filled"
              avatar={<GiBuyCard color="white" />}
              sx={{ backgroundColor: 'success.light' }}
            />
          );
        case 'sell':
          return (
            <Chip
              label="SELL"
              variant="filled"
              avatar={<GiSellCard color="white" />}
              sx={{ backgroundColor: 'error.light' }}
            />
          );
        case 'dividend':
          return (
            <Chip
              label="DIVIDEND"
              variant="filled"
              avatar={<GiReceiveMoney color="white" />}
              sx={{ backgroundColor: 'warning.light' }}
            />
          );
      }
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 70,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 90,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.price}`,
  },
  {
    field: 'fee',
    headerName: 'Fee',
    width: 80,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.fee}`,
  },
  {
    field: 'totalCost',
    headerName: 'Total Cost',
    width: 100,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `$${params.row.amount * params.row.price - params.row.fee}`,
  },
  {
    field: 'netValue',
    headerName: 'Net Value',
    width: 90,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `$${params.row.netValue * params.row.amount}`,
  },
  {
    field: 'netPL',
    headerName: 'Net P/L',
    width: 160,
    editable: false,
    renderCell: (params: GridCellParams) => {
      const netValue = params.row.netValue * params.row.amount;
      const purchasePrice =
        params.row.amount * params.row.price - params.row.fee;
      switch (params.row.type) {
        case 'buy':
          return (
            <NetPLCell firstValue={purchasePrice} secondValue={netValue} />
          );
        case 'sell':
          return (
            <NetPLCell firstValue={netValue} secondValue={purchasePrice} />
          );
        case 'dividend':
      }
    },
  },
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

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  fontSize: '1.2rem',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));
interface IProps {
  assetMarketData: any;
}

export const TransactionHistory = ({ assetMarketData }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const marketData = assetMarketData.market_data;
  const customizedRow = rows.map((item) => {
    return { ...item, netValue: marketData.current_price.usd };
  });
  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px':'5px 20px 20px 20px',
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
      color={profitLoss < 0 ? 'error.main' : 'success.main'}
    >
      {profitLoss > 0 ? '+' : '-'}
      {dollarSign}
      {weight < 0 ? weight.toString().slice(1) : weight} (
      {profitLoss > 0 ? '+' : ''}
      {precisionRound(profitLoss, 4)}%)
    </Typography>
  );
}

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}
