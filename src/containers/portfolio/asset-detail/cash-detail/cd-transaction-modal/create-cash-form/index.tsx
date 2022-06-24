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
import { BuyCashForm } from "./cd-buy-cash-form";
import { SellCashForm } from "./cd-sell-cash-form";
import { TransferCashForm } from "./cd-transfer-cash-form";
import {
  cashDetailStore,
  portfolioDetailStore,
} from "shared/store";
import { getCurrencyByCode } from "shared/helpers";
import { ITransactionRequest, TransferToInvestFundType } from "shared/types";
import { WithdrawToOutsideForm } from "./cd-withdraw-to-outside";
import { TransactionRequestType, TransactionTypeConstants } from "shared/constants";
import { useRouter } from 'next/router';
import { content as i18n } from 'i18n';

interface IProps { }

export const CreateCashForm = observer(({ }: IProps) => {
  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].cashDetailPage : i18n['en'].cashDetailPage;

  const assetName = getCurrencyByCode(cashDetailStore.cashDetail?.currencyCode || '')?.name;
  const buttonLabels = [content.transactionForm.buy, content.transactionForm.sell, content.transactionForm.transfer, content.transactionForm.withdraw];

  useEffect(() => {
    const fetchAssetPrice = async () => { };
    fetchAssetPrice();
    setSelectedForm(<BuyCashForm content={content} key={focusedButtonKey} handleFormSubmit={makeBuyAction} />);
  }, []);

  async function makeTransferAction(payload: TransferToInvestFundType) {
    const res = await cashDetailStore.moveToFund(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cashDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  async function makeBuyAction(payload: ITransactionRequest) {

    if (payload.transactionType === TransactionRequestType.addValue
      && payload.destinationAssetId === payload.referentialAssetId) {
      setErrorMessage("Can't buy cash by using money from itself");
      return;
    }
    const res = await cashDetailStore.makeTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cashDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  async function makeSellAction(payload: ITransactionRequest) {
    if (payload.transactionType === TransactionRequestType.withdrawToCash
      && payload.destinationAssetId === payload.referentialAssetId) {
      setErrorMessage("Error! Transaction can't execute");
      return;
    }
    const res = await cashDetailStore.makeTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cashDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  async function withdrawToOutside(payload: ITransactionRequest) {
    const res = await cashDetailStore.makeTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      cashDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  const formArray = [
    <BuyCashForm content={content} key={focusedButtonKey} handleFormSubmit={makeBuyAction} />,
    <SellCashForm content={content} key={focusedButtonKey} handleFormSubmit={makeSellAction} />,
    <TransferCashForm
      content={content}
      key={focusedButtonKey}
      handleFormSubmit={makeTransferAction}
    />,
    <WithdrawToOutsideForm content={content} key={focusedButtonKey} handleFormSubmit={withdrawToOutside} />
  ];
  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setSelectedForm(formArray[key]);
    setErrorMessage('');
  };


  const handleClose = () => {
    cashDetailStore.setOpenAddNewTransactionModal(false);
  };

  return (
    <Box sx={{ height: "inherit" }}>
      <Box sx={{ mt: "1rem" }}>
        <Typography align="center" id="modal-modal-title" variant="h4">
          {content.transactionForm.transaction}
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
          {portfolioDetailStore.portfolioInfo?.name || ''}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {assetName}
        </Typography>
      </Box>

      <Typography variant="body1" color="error" align="center" height="1.5rem">
        {errorMessage}
      </Typography>
      <Box
        sx={{
          [theme.breakpoints.down("sm")]: { height: "390px" },

          [theme.breakpoints.up("sm")]: {
            height: "460px",
          },
        }}
      >
        {selectedForm}
      </Box>
    </Box>
  );
});
