import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { REWithdrawToCash } from "./re-withdraw-to-cash-form";
import { REMoveToFundForm } from "./re-move-to-fund-form";
import { realEstateDetailStore } from "shared/store";
import { ITransactionRequest, TransferToInvestFundType } from "shared/types";
import REWithdrawToOutside from "./re-withdraw-outside";

interface IProps { }

export const CreateEstateForm = observer(({ }: IProps) => {
  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const portfolioName = realEstateDetailStore.portfolioInfo?.name;
  const assetName = realEstateDetailStore.assetDetail?.name;
  const buttonLabels = ["Sell", "Withdraw", "Transfer"];

  useEffect(() => {
    setSelectedForm(<REWithdrawToCash key={focusedButtonKey} handleFormSubmit={sellAsset} />);
  }, []);

  const sellAsset = async (payload: ITransactionRequest) => {
    const res = await realEstateDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      realEstateDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const moveToFund = async (payload: TransferToInvestFundType) => {
    const res = await realEstateDetailStore.transferAssetToInvestFund(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      realEstateDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const withdrawValue = async (payload: ITransactionRequest) => {
    const res = await realEstateDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      realEstateDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  const formArray = [
    <REWithdrawToCash key={focusedButtonKey} handleFormSubmit={sellAsset} />,
    <REWithdrawToOutside key={focusedButtonKey} handleFormSubmit={withdrawValue} />,
    <REMoveToFundForm key={focusedButtonKey} handleFormSubmit={moveToFund} />,
  ];

  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setErrorMessage('');
    setSelectedForm(formArray[key]);
  };

  const handleClose = () => {
    realEstateDetailStore.setOpenAddNewTransactionModal(false);
  };

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
            mt: '0.4rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {portfolioName}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        >
          {assetName}
        </Typography>
      </Box>
      <Typography variant="body1" color="error" align="center" height="1.5rem">
        {errorMessage}
      </Typography>
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
