import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { bankSavingsDetailStore } from "shared/store";
import { ITransactionRequest, TransferToInvestFundType } from "shared/types";
import BSWithdrawToCash from "./bs-withdraw-to-cash-form";
import BSWithdrawToOutside from "./bs-withdraw-to-outside";
import { BSMoveToFundForm } from "./bs-move-to-fund-form";
import { useRouter } from 'next/router';
import { content as i18n } from 'i18n';

interface IProps { }

export const CreateBankForm = observer(({ }: IProps) => {
  const theme = useTheme();
  const [focusedButtonKey, setFocusedButtonKey] = useState(0);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].bankSavingDetailPage : i18n['en'].bankSavingDetailPage;

  const portfolioName = bankSavingsDetailStore.portfolioInfo?.name;
  const assetName = bankSavingsDetailStore.assetDetail?.name;
  const buttonLabels = [content.transactionForm.sell, content.transactionForm.transfer, content.transactionForm.withdraw];

  useEffect(() => {
    setSelectedForm(<BSWithdrawToCash content={content} key={focusedButtonKey} handleFormSubmit={sellAsset} />);
  }, []);

  const sellAsset = async (payload: ITransactionRequest) => {
    const res = await bankSavingsDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      bankSavingsDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const moveToFund = async (payload: TransferToInvestFundType) => {
    const res = await bankSavingsDetailStore.transferAssetToInvestFund(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      bankSavingsDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  };

  const withdrawValue = async (payload: ITransactionRequest) => {
    const res = await bankSavingsDetailStore.createNewTransaction(payload);
    if (res.isError) {
      setErrorMessage(res.data.data);
    } else {
      bankSavingsDetailStore.setUpdateOverviewData(true);
      handleClose();
    }
  }

  const formArray = [
    <BSWithdrawToCash content={content} key={focusedButtonKey} handleFormSubmit={sellAsset} />,
    <BSWithdrawToOutside content={content} key={focusedButtonKey} handleFormSubmit={withdrawValue} />,
    <BSMoveToFundForm content={content} key={focusedButtonKey} handleFormSubmit={moveToFund} />,
  ];

  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
    setErrorMessage('');
    setSelectedForm(formArray[key]);
  };

  const handleClose = () => {
    bankSavingsDetailStore.setOpenAddNewTransactionModal(false);
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
