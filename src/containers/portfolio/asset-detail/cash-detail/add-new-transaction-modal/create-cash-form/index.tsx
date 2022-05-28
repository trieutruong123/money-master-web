import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BuyCashForm } from "./buy-cash-form";
import { SellCashForm } from "./sell-cash-form";
import { TransferCashForm } from "./transfer-cash-form";
import {
  cashDetailStore,
  IMoveToFundPayload,
  ITransactionPayload,
  portfolioDetailStore,
} from "shared/store";

interface IProps {}

export const CreateCashForm = observer(({}: IProps) => {
  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [assetPrice, setAssetPrice] = useState(0);

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
    setSelectedForm(<BuyCashForm key={focusedButtonKey} handleFormSubmit />);
  }, []);

  async function makeTransferAction(data: any) {
    const { currencyCode, destinationAssetId, amount } = data;
    const payload: ITransactionPayload = {
      currencyCode,
      destinationAssetId,
      amount,
      transactionType:"withdrawValue",
      destinationAssetType: "cash",
      isTransferringAll: false
    };
    await cashDetailStore.makeTransaction(payload);
  }

  async function makeBuyAction(data: any) {
    console.log(" BUY ACTIONN");
    console.log(data);
  }

  async function makeSellAction(data: any) {

   
     const { currencyCode, amount ,sellingDestination} = data;
     switch(sellingDestination){
       case 'toFund':{
        const payload= {
          referentialAssetId:cashDetailStore.cashId,
          referentialAssetType:'cash',
          amount,
          currencyCode,
          isTransferringAll: false
        };
        await cashDetailStore.moveToFund(payload);
        break;
       }
       case 'toOutside':{

        break;
       }
     }
    
  }

  const buttonLabels = ["Buy", "Sell", "Transfer"];
  const formArray = [
    <BuyCashForm key={focusedButtonKey} handleFormSubmit={makeBuyAction} />,
    <SellCashForm key={focusedButtonKey} handleFormSubmit={makeSellAction} />,
    <TransferCashForm
      key={focusedButtonKey}
      handleFormSubmit={makeTransferAction}
    />,
  ];
  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setSelectedForm(formArray[key]);
  };

  const assetName = cashDetailStore.currencyName;

  const handleFormSubmit = async (data: any) => {};

  return (
    <Box sx={{ height: "inherit" }}>
      <Box sx={{ mt: "1rem" }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          Transaction
        </Typography>
      </Box>
      <Box sx={{ ml: "3rem", mt: "1rem" }}>
        <ButtonGroup aria-label="outlined primary button group">
          {buttonLabels.map((item: string, key: number) => {
            return (
              <Button
                key={key.toString()}
                variant={key === focusedButtonKey ? "contained" : "outlined"}
                onClick={() => handleSelectionChanged(key)}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
        <Typography
          variant="body1"
          sx={{
            mt: "0.4rem",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {portfolioDetailStore.portfolioInfo?.name||''}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {assetName}
        </Typography>
      </Box>
      <Box
        sx={{
          [theme.breakpoints.down("sm")]: { height: "410px" },

          [theme.breakpoints.up("sm")]: {
            height: "480px",
          },
        }}
      >
        {selectedForm}
      </Box>
    </Box>
  );
});
