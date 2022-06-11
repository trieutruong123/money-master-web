import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { cashDetailStore } from 'shared/store';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers';
import { AssetTypeName, TransactionRequestType } from 'shared/constants';
import { CurrencyItem } from 'shared/types';
import { CashItem } from 'shared/models';

type FormValues = {
  amount: number;
  date: Date;
  currencyCode: string;
  fee: string;
  tax: string;
};

interface IProps {
  handleFormSubmit: Function;
}

export const BuyCashForm = ({ handleFormSubmit }: IProps) => {
  const [moneySource, setMoneySource] = useState<string>('outside');
  const [referentialCashCode, setReferentialCashCode] = useState<string>('');
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    fee: Yup.number(),
    tax: Yup.number(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const currencyList = getSupportedCurrencyList();
  const usingMoneySourceList = [{
    id: uuid(),
    type: 'outside',
    name: 'Outside',
  },
  {
    id: uuid(),
    type: 'fund',
    name: 'Fund',
  },
  {
    id: uuid(),
    type: 'cash',
    name: 'Cash',
  },]

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.amount,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: cashDetailStore.cashDetail?.currencyCode || 'USD',
      transactionType: TransactionRequestType.addValue,
      destinationAssetId: cashDetailStore?.cashDetail?.id,
      destinationAssetType: AssetTypeName.cash,
      referentialAssetId: moneySource === 'cash' ? cashDetailStore.cashList?.find((item: CashItem) => item.currencyCode === referentialCashCode)?.id : null,
      referentialAssetType: moneySource === 'cash' ? AssetTypeName.cash : (moneySource === 'fund' ? 'fund' : null),
      isTransferringAll: false,
      isUsingFundAsSource: moneySource === 'fund',
      fee: data.fee,
      tax: data.tax,
    });
  };


  const handleMoneySourceChange = (event: any) => {
    setMoneySource(event.target.value);
  }

  const handleReferentialCashCodeChange = (event: any) => {
    setReferentialCashCode(event.target.value);
  }


  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        height: 'inherit',
        overflow: 'auto',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        mx: '3rem',
        [theme.breakpoints.down('xs')]: {
          mx: '2rem',
        },
      }}
    >
      <TextField
        type="number"
        fullWidth
        sx={{ mt: '10px', display: 'block' }}
        id="outlined-amount"
        label={'Amount*'}
        inputProps={{ step: 'any' }}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
        InputProps={{
          endAdornment: getCurrencyByCode(cashDetailStore.cashDetail?.currencyCode || 'USD')?.symbol || '',
        }}
      ></TextField>
      <Box mt='10px' />
      <FormControl fullWidth>
        <InputLabel id="source-money">{'Use money from*'}</InputLabel>
        <Select
          variant="outlined"
          labelId="source-money"
          id="stock-source-money-select"
          label={`*${'Use money from*'}`}
          onChange={handleMoneySourceChange}
          defaultValue={moneySource}
          value={moneySource}
          required
        >
          {usingMoneySourceList?.map((item, index) => {
            return (
              <MenuItem key={item.id} value={item.type}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {moneySource === 'cash' ? <>
        <Box mt='10px' />
        <FormControl fullWidth>
          <InputLabel id="destination-cash-list">{'Select destination cash*'}</InputLabel>
          <Select
            variant="outlined"
            labelId="destination-cash-list"
            id="stock-destination-cash-select"
            label={`*${'Select destination cash*'}`}
            onChange={handleReferentialCashCodeChange}
            value={referentialCashCode}
            defaultValue={referentialCashCode}
            required
          >
            {cashDetailStore.currencyList?.map((item, index) => {
              return (
                <MenuItem key={item.code} value={item.code}>
                  {item.code} - {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </>
        : <></>}
      <Grid container spacing={isXs ? 1 : 2}>
        <Grid item xs={12} sm={6} sx={{ display: 'block' }}>
          <TextField
            type="number"
            fullWidth
            inputProps={{
              step: 'any'
            }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-fee"
            label={`${"Fee"}`}
            {...register('fee')}
            variant="outlined"
            defaultValue={0}
            error={typeof errors.fee?.message !== 'undefined'}
            helperText={errors.fee?.message} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'block' }}>
          <TextField
            type="number"
            fullWidth
            inputProps={{
              step: 'any'
            }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-tax"
            label={`${"Tax (%)"}`}
            {...register('tax')}
            variant="outlined"
            defaultValue={0}
            error={typeof errors.tax?.message !== 'undefined'}
            helperText={errors.tax?.message} />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 'auto',
          bg: colorScheme.theme,
          width: '100%',
          fontSize: '1.4rem',
          height: '2.5rem',
        }}
      >
        ADD
      </Button>
    </Box>
  );
};
