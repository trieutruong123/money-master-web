import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Box, Button,  TextField, useTheme } from "@mui/material";
import {  SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { colorScheme } from "utils/color-scheme";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { observer } from "mobx-react-lite";
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import { cashDetailStore, portfolioDetailStore } from "shared/store";
import { currencyList } from "shared/helpers";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type FormValues = {
  destinationAssetId: number;
  amount: number;
  currencyCode:string;
};

interface IProps {
  handleFormSubmit: any;
}

export const SellCashForm = observer(({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .typeError("Amount must be a number")
      .positive("Amount must be greater than zero"),
      destinationAssetId:Yup.number()
      .required("Destination asset is required"),
      currencyCode:Yup.string()
      .required("Currency code is required")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    handleFormSubmit(data);
    cashDetailStore.setOpenAddNewTransactionModal(false);
  };

  

  const [destinationAssetId, setDestinationAssetId] = React.useState('');
  const [currencyCode, setCurrencyCode] = React.useState('');
  const handleChangeDestinationAssetId = (event: SelectChangeEvent) => {
    setDestinationAssetId(event.target.value as string);
  };
  const handleChangeCurrencyCode = (event: SelectChangeEvent) => {
    setCurrencyCode(event.target.value as string);
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
      <InputLabel id="destination-asset-select">Destination asset</InputLabel>
      <Select
       {...register("destinationAssetId")}
        type="number"
        labelId="destination-asset-select"
        id="destination-asset-select"
        value={destinationAssetId}
        label="Destination asset"
        onChange={handleChangeDestinationAssetId}
        error={typeof errors.destinationAssetId?.message !== "undefined"}
      >
        {portfolioDetailStore.cashDetail?.map(asset=>{
          if (asset.id!=cashDetailStore.cashId)
          return(
            <MenuItem key={asset.id} value={asset.id}>{asset.name} (cash)</MenuItem>
          )
        })}
      </Select>
      <TextField
        type="number"
        inputProps={{
          step: "0.0000001"   // to accept float number in MUI text field
        }}
        fullWidth
        sx={{ my: 1, display: "block" }}
        id="outlined-amount"
        label={"*Amount"}
        {...register("amount")}
        variant="outlined"
        error={typeof errors.amount?.message !== "undefined"}
        helperText={errors.amount?.message}
      ></TextField>
      <InputLabel id="currency-code-select">Currency code</InputLabel>
      <Select
      sx={{mb:3}}
       {...register("currencyCode")}
        type="string"
        labelId="currency-code-select"
        id="currency-code-select"
        value={currencyCode}
        label="Currency code"
        onChange={handleChangeCurrencyCode}
        error={typeof errors.currencyCode?.message !== "undefined"}
      >
        {Object.keys(currencyList).map((currency, index) =>
            <MenuItem key={index} value={currency}>{`${currencyList[currency]} (${currency})`}</MenuItem>
          )
        })
      </Select>
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
        ADD
      </Button>
    </Box>
  );
});
