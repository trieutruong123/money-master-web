import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { AssetTypeName, TransactionRequestType } from 'shared/constants';
import { getSupportedCurrencyList } from 'shared/helpers';
import { observer } from 'mobx-react-lite';
import { cryptoDetailStore } from 'shared/store';

type FormValues = {
  purchasePrice: number;
  amount: number;
  date: Date;
  currencyCode: string;
  fee: string;
  tax: string;
};

interface IProps {
  handleFormSubmit: Function;
}

export const CDBuyCryptoForm = observer(({ handleFormSubmit }: IProps) => {
  const [moneySource, setMoneySource] = useState<string>('outside');
  const [destinationCashCode, setDestinationCashCode] = useState<string>('');
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const validationSchema = Yup.object().shape({
    purchasePrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    fee: Yup.number(),
    tax: Yup.number(),
  });
  const currencyList = getSupportedCurrencyList();
  const usingMoneySourceList = [{
    id: uuid(),
    type: 'outside',
    name: 'Using money from outside',
  },
  {
    id: uuid(),
    type: 'fund',
    name: 'Using money from fund',
  },
  {
    id: uuid(),
    type: 'cash',
    name: 'Using money from cash',
  },]

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.purchasePrice * data.amount,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.addValue,
      destinationAssetId: cryptoDetailStore?.cryptoDetail?.id,
      destinationAssetType: AssetTypeName.cryptoCurrency,
      referentialAssetId: moneySource === 'cash' ? cryptoDetailStore.cashDetail?.find(item => item.currencyCode === destinationCashCode)?.id : null,
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

  const handleDestinationCashCode = (event: any) => {
    setDestinationCashCode(event.target.value);
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
        id="outlined-buy-price"
        label={'*Purchase Price'}
        {...register('purchasePrice')}
        variant="outlined"
        error={typeof errors.purchasePrice?.message !== 'undefined'}
        helperText={errors.purchasePrice?.message}
      ></TextField>
      <TextField
        type="number"
        fullWidth
        sx={{ mt: '10px', display: 'block' }}
        id="outlined-amount"
        label={'*Amount'}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
      ></TextField>
      <Box mt='10px' />
      <FormControl fullWidth>
        <InputLabel id="currency-list">{'Currency'}</InputLabel>
        <Select
          variant="outlined"
          labelId="currency-list"
          id="crypto-currency-list-select"
          label={`*${'Currency'}`}
          defaultValue={cryptoDetailStore.cryptoDetail?.currencyCode || 'USD'}
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
      <Box mt='10px' />
      <FormControl fullWidth>
        <InputLabel id="source-money">{'Select source money*'}</InputLabel>
        <Select
          variant="outlined"
          labelId="source-money"
          id="crypto-source-money-select"
          label={`*${'Select source money*'}`}
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
            id="crypto-destination-cash-select"
            label={`*${'Select destination cash*'}`}
            onChange={handleDestinationCashCode}
            value={destinationCashCode}
            defaultValue={destinationCashCode}
            required
          >
            {cryptoDetailStore.currencyList?.map((item, index) => {
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
});
