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

import { WithdrawToCashForm } from "./withdraw-to-cash-form";
import { MoveToFundForm } from "./move-to-fund-form";
import { bankSavingsDetailStore } from "shared/store";
import {
  cashDetailStore,
  IMoveToFundPayload,
  ITransactionPayload,
  portfolioDetailStore,
} from "shared/store";

interface IProps {}

export const CreateBankForm = observer(({}: IProps) => {
  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [assetPrice, setAssetPrice] = useState(0);

  useEffect(() => {
    const fetchAssetPrice = async () => {};
    fetchAssetPrice();
    setSelectedForm(<WithdrawToCashForm key={focusedButtonKey} handleFormSubmit={makeWithdrawAction} />);
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

  async function makeWithdrawAction(data: any) {
    const {destinationCashId,currencyCode}=data;
    await bankSavingsDetailStore.withdrawAllToCash(destinationCashId,currencyCode)
  }

  async function makeSellAction(data: any) {
    const {currencyCode}=data;
    await bankSavingsDetailStore.moveAllToFund(currencyCode)
  }

  const buttonLabels = ["Withdraw", "Sell"];
  const formArray = [
    <WithdrawToCashForm key={focusedButtonKey} handleFormSubmit={makeWithdrawAction} />,
    <MoveToFundForm key={focusedButtonKey} handleFormSubmit={makeSellAction} />,
    
  ];
  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setSelectedForm(formArray[key]);
  };

  const assetName = cashDetailStore.currencyName;

  return (
    <Box sx={{ height: "inherit" }}>
      <Box sx={{ mt: "1rem" }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          Transaction
        </Typography>
        <Typography
         align="center"  variant="h4"
          sx={{ color: "darkgreen" }}
        >
          {`${bankSavingsDetailStore.bankSavingsName}`}
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
            height: "350px",
          },
        }}
      >
        {selectedForm}
      </Box>
    </Box>
  );
});
