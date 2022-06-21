import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { cashDetailStore } from 'shared/store';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers';
import { AssetTypeName, SourceMoneyConstants, TransactionRequestType } from 'shared/constants';
import { CashItem } from 'shared/models';
import { useRouter } from 'next/router';

type FormValues = {
  amount: number;
  date: Date;
  currencyCode: string;
  fee: string;
  tax: string;
};

interface IProps {
  handleFormSubmit: Function;
  content: any
}

export const BuyCashForm = ({ handleFormSubmit, content }: IProps) => {
  const [moneySource, setMoneySource] = useState<string>('outside');
  const [referentialCashCode, setReferentialCashCode] = useState<string>('');
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { locale } = router;
  const language = locale === 'vi' ? 'vi' : locale === 'en' ? 'en' : 'en';
  const currencyList = getSupportedCurrencyList();
  const usingMoneySourceList = [{
    id: uuid(),
    type: 'outside',
    name: SourceMoneyConstants[language].outside,
  },
  {
    id: uuid(),
    type: 'fund',
    name: SourceMoneyConstants[language].fund,
  },
  {
    id: uuid(),
    type: 'cash',
    name: SourceMoneyConstants[language].cash,
  },
  ]

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
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
        label={`${content.transactionForm.inputMoney}*`}
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
        <InputLabel id="source-money">{content.transactionForm.useMoneyFrom}*</InputLabel>
        <Select
          variant="outlined"
          labelId="source-money"
          id="stock-source-money-select"
          label={`${content.transactionForm.useMoneyFrom}*`}
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
          <InputLabel id="destination-cash-list">{content.transactionForm.destinationCash}*</InputLabel>
          <Select
            variant="outlined"
            labelId="destination-cash-list"
            id="stock-destination-cash-select"
            label={`${content.transactionForm.destinationCash}*`}
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
            label={`${content.transactionForm.fee}`}
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
            label={`${content.transactionForm.tax} (%)`}
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
        {content.transactionForm.addButton}
      </Button>
    </Box>
  );
};
