import { CardContent, Card, Grid, useTheme, Chip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { GiBuyCard, GiSellCard, GiTransform } from "react-icons/gi";
import { CustomNoRowsOverlay } from "shared/components";
import SettingsMenuButton from "./settings-menu-button";

const columns: GridColDef[] = [
  {
    field: "time",
    headerName: "Purchase Date",
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.value).format("MMM DD YYYY HH:mm")}`,
  },
  {
    field: "type",
    headerName: "Transaction",
    sortable: false,
    filterable: false,
    width: 140,
    editable: true,
    renderCell: (params: GridCellParams) => {
      switch (params.row.type) {
        case "newAsset":
        case "buy":
        case "buyFromOutside":
          return (
            <Chip
              label="BUY"
              variant="filled"
              avatar={<GiBuyCard color="white" />}
              sx={{ backgroundColor: "success.light" }}
            />
          );

        case "moveToFund":
          return (
            <Chip
              label="SELL"
              variant="filled"
              avatar={<GiSellCard color="white" />}
              sx={{ backgroundColor: "error.light" }}
            />
          );

        case "withdrawToCash":
          return (
            <Chip
              label="TRANSFER"
              variant="filled"
              avatar={<GiTransform color="white" />}
              sx={{ backgroundColor: "warning.light" }}
            />
          );
      }
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 130,
    editable: false,
  },
  {
    field: "desName",
    headerName: "Transaction To",
    width: 130,
    editable: false,
    renderCell: (params: GridCellParams) => {
      switch (params.row.desName) {
        case null:
          return "N/A";
      }
    },
  },
  {
    field: "desType",
    headerName: "Destination Type",
    width: 130,
    editable: false,
    renderCell: (params: GridCellParams) => {
      switch (params.row.desType) {
        case null:
          return "N/A";
      }
    },
  },
  {
    field: "currencyCode",
    headerName: "Currency",
    width: 130,
    editable: false,
  },
  {
    field: "settings",
    headerName: "Settings",
    sortable: false,
    filterable: false,
    width: 80,
    renderCell: (params: GridCellParams) => {
      return <SettingsMenuButton />;
    },
  },
];

interface IProps {
  transactionHistoryData: any;
}

const TransactionHistory = ({ transactionHistoryData }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down("sm");

  const customizedRow = transactionHistoryData.map((transaction: any) => {
    return {
      id: transaction.id,
      time: transaction.createdAt,
      amount: transaction.amount,
      desId: transaction.destinationAssetId,
      desName: transaction.destinationAssetName,
      desType: transaction.destinationAssetType,
      currencyCode: transaction.currencyCode,
      type: transaction.singleAssetTransactionType,
    };
  });
  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: "12px",
          padding: isMobile ? "5px" : "5px 20px 20px 20px",
          boxShadow: "0 0 8px rgba(0,0,0,0.11)",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "none",
          }}
        >
          <CardContent
            sx={{
              height: 400,
              width: "100%",
              padding: isMobile ? "32px 0px" : "initial",
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

export default TransactionHistory;
