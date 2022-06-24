import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, TextField, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { colorScheme } from "utils/color-scheme";
import { observer } from "mobx-react-lite";
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import { cashDetailStore } from "shared/store";
import { getCurrencyByCode, getSupportedCurrencyList } from "shared/helpers/currency-info";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AssetTypeName, TransactionRequestType } from "shared/constants";
import { CashItem } from "shared/models";
import { CurrencyItem } from "shared/types";

type FormValues = {
  amount: number;
  destinationCurrencyCode: string;
  fee: number;
  tax: number;
};

interface IProps {
  handleFormSubmit: Function;
  content: any
}

export const SellCashForm = observer(({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    destinationCurrencyCode: Yup.string().required(''),
    tax: Yup.number()
      .typeError('Tax must be a number')
      .min(0,'Tax must be greater than zero'),
    fee: Yup.number()
      .typeError('Fee must be a number')
      .min(0,'Fee must be greater than zero'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;
  const currencyList = getSupportedCurrencyList();

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.amount,
      valueOfReferentialAssetBeforeCreatingTransaction:cashDetailStore.cashDetail?.amount||0,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: cashDetailStore.cashDetail?.currencyCode || 'USD',
      transactionType: TransactionRequestType.withdrawToCash,
      destinationAssetId: cashDetailStore.cashList?.find((item: CashItem) => item.currencyCode === data.destinationCurrencyCode)?.id,
      destinationAssetType: AssetTypeName.cash,
      referentialAssetId: cashDetailStore.cashDetail?.id,
      referentialAssetType: AssetTypeName.cash,
      isTransferringAll: false,
      isUsingFundAsSource: false,
      fee: data.fee,
      tax: data.tax,
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
        inputProps={{
          step: 'any'  // to accept float number in MUI text field
        }}
        fullWidth
        sx={{ my: 1, display: "block" }}
        id="outlined-amount"
        label={`${content.transactionForm.inputMoney}*`}
        {...register("amount")}
        variant="outlined"
        error={typeof errors.amount?.message !== "undefined"}
        helperText={errors.amount?.message}
        InputProps={{
          endAdornment: getCurrencyByCode(cashDetailStore.cashDetail?.currencyCode || 'USD')?.symbol || '',
        }}
      ></TextField>
      <Box mt='10px'></Box>
      <FormControl fullWidth>
        <InputLabel id="destination-cash">{content.transactionForm.destinationCash}*</InputLabel>
        <Select
          variant="outlined"
          labelId="destination-cash"
          id="crypto-destination-cash-select"
          label={`${content.transactionForm.destinationCash}*`}
          {...register('destinationCurrencyCode')}
          defaultValue={cashDetailStore.cashList?.at(0)?.currencyCode || 'USD'}
          required
        >
          {cashDetailStore.currencyList?.map((item: CurrencyItem, index) => {
            return (
              <MenuItem key={item.code} value={item.code}>
                {item.code} - {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
        {content.transactionForm.sellButton}
      </Button>
    </Box>
  );
});
