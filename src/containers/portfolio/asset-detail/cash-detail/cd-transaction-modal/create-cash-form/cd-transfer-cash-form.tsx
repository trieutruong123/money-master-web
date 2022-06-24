import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { colorScheme } from "utils/color-scheme";
import { observer } from "mobx-react-lite";
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import { cashDetailStore, portfolioDetailStore } from "shared/store";
import { getCurrencyByCode, getSupportedCurrencyList } from "shared/helpers/currency-info";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AssetTypeName, TransactionRequestType } from "shared/constants";

type FormValues = {
  amount: number;
};

interface IProps {
  handleFormSubmit: Function;
  content: any
}

export const TransferCashForm = observer(({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .typeError("Amount must be a number")
      .positive("Amount must be greater than zero"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    handleFormSubmit({
      amount: data.amount,
      valueOfReferentialAssetBeforeCreatingTransaction:cashDetailStore.cashDetail?.amount||0,
      amountInDestinationAssetUnit: 0,
      currencyCode: cashDetailStore.cashDetail?.currencyCode || 'USD',
      transactionType: TransactionRequestType.moveToFund,
      referentialAssetType: AssetTypeName.cash,
      referentialAssetId: cashDetailStore.cashDetail?.id,
      destinationAssetId: null,
      destinationAssetType: 'fund',
      isTransferringAll: false,
      isUsingFundAsSource: false,
      fee: 0,
      tax: 0,
    });
  };


  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        height: "inherit",
        overflow: "auto",
        justifyContent: "center",
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        mx: "3rem",
        [theme.breakpoints.down("xs")]: {
          mx: "2rem",
        },
      }}
    >
      <TextField
        type="number"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-amount"
        label={`${content.transactionForm.inputMoney}*`}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
        inputProps={{
          step: 'any',
        }}
        InputProps={{
          endAdornment: getCurrencyByCode(cashDetailStore.cashDetail?.currencyCode || 'USD')?.symbol || '',
        }}
      ></TextField>
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: "auto",
          bg: colorScheme.theme,
          width: "100%",
          fontSize: "1.4rem",
          height: "2.5rem",
        }}
      >
        {content.transactionForm.moveToFund}
      </Button>
    </Box>
  );
});

