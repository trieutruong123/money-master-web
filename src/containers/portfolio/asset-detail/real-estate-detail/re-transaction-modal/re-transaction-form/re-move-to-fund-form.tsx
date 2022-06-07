import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { colorScheme } from "utils/color-scheme";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import {
  realEstateDetailStore,
} from "shared/store";
import { getSupportedCurrencyList } from "shared/helpers/currency-info";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import { AssetTypeName } from "shared/constants";

type FormValues = {
  amount: number;
  currencyCode: string;
};

interface IProps {
  handleFormSubmit: Function;
}

export const MoveToFundForm = observer(({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    amount: Yup.number(),
    currencyCode: Yup.string().required().default('USD'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;
  const currencyList = getSupportedCurrencyList();

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      referentialAssetId: realEstateDetailStore.assetDetail?.id,
      referentialAssetType: AssetTypeName.realEstate,
      currencyCode: realEstateDetailStore.assetDetail?.inputCurrency.toUpperCase() || 'USD',
      amount: realEstateDetailStore.assetDetail?.inputMoneyAmount,
      isTransferingAll: true,
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
      <Typography color='primary'>* All money from asset will be transferred</Typography>
      <TextField
        type="number"
        fullWidth
        sx={{ mt: 1, display: 'block' }}
        inputProps={{
          step: 'any',
          readOnly: true,
        }}
        id="outlined-amount"
        label={'Amount*'}
        value={realEstateDetailStore.assetDetail?.inputMoneyAmount}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
      ></TextField>
      <Box mt='10px'></Box>

      <FormControl fullWidth>
        <InputLabel id="currency-list">{'Currency Code*'}</InputLabel>
        <Select
          variant="outlined"
          labelId="currency-list"
          id="stock-currency-list-select"
          label={`*${'Currency Code'}`}
          value={realEstateDetailStore.assetDetail?.inputCurrency || 'USD'}
          {...register('currencyCode')}
        >
          {currencyList.map((item, index) => {
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
        TRANSFER TO FUND
      </Button>
    </Box>
  );
});
