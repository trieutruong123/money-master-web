import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers';
import { portfolioDetailStore } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { UsingMoneySource } from 'shared/constants';

type FormValues = {
  amount: number;
  currencyCode: string;
  description: string;
  cashId?: number;
  fee?: number;
  tax?: number;
};

interface IProps {
  handleFormSubmit: any;
  content: any;
}

export const BuyCashForm = observer(({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const cashList = portfolioDetailStore.cashDetail;
  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    currencyCode: Yup.string().required().default('USD'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    description: Yup.string(),
    cashId: Yup.number(),
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

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    handleFormSubmit({
      inputDay: date,
      currencyCode: data.currencyCode,
      amount: data.amount,
      name: getCurrencyByCode(data.currencyCode)?.name || '',
      description: data.description,
      isUsingInvestFund: portfolioDetailStore.selectedAsset?.moneySource === UsingMoneySource.usingFund,
      isUsingCash: portfolioDetailStore.selectedAsset?.moneySource === UsingMoneySource.usingCash,
      usingCashId: data.cashId,
      fee: data.fee,
      tax: data.tax,
    });
  };

  return (
    <Box
      sx={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Box
        id="buy-cash-form"
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          px: '3rem',
          [theme.breakpoints.down('xs')]: {
            px: '2rem',
          },
        }}
      >
        <Grid container spacing="2">
          <TextField
            type="number"
            fullWidth
            inputProps={{ step: 'any' }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-cash-amount"
            label={`${content.amount}*`}
            {...register('amount')}
            variant="outlined"
            error={typeof errors.amount?.message !== 'undefined'}
            helperText={errors.amount?.message}
          ></TextField>
          <Grid container spacing={isXs ? 1 : 2}>
            <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
              <FormControl fullWidth>
                <InputLabel id="currency-list">{content.currency}*</InputLabel>
                <Select
                  variant="outlined"
                  labelId="currency-list"
                  id="cash-currency-list-select"
                  label={`${content.currency}*`}
                  defaultValue="USD"
                  {...register('currencyCode')}
                  required
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
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label={`${content.inputDay}*`}
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField sx={{ width: '100%' }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {
            portfolioDetailStore.selectedAsset?.moneySource === UsingMoneySource.usingCash && cashList !== undefined && cashList.length > 0 ? (
              <Grid item xs={12} sx={{ mt: 1, display: 'block' }}>
                <FormControl fullWidth>
                  <InputLabel id="select-cash-source">{content.selectCashSource}</InputLabel>
                  <Select
                    variant="outlined"
                    labelId="your-cash"
                    id="bank-savings-your-cash-select"
                    label={`${content.selectCashSource}*`}
                    defaultValue={cashList[0].id}
                    {...register('cashId')}
                    required
                  >
                    {cashList.map((item, index) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.currencyCode} - {getCurrencyByCode(item.currencyCode)?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            ) : null
          }


          <Grid container spacing={isXs ? 1 : 2}>
            <Grid item xs={12} sm={6} sx={{ display: 'block' }}>
              <TextField
                type="number"
                fullWidth
                inputProps={{
                  step: 'any'
                }}
                sx={{ mt: 1, display: 'block' }}
                id="outlined-bank-savings-fee"
                label={`${content.fee}`}
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
                id="outlined-bank-savings-tax"
                label={`${content.tax} (%)`}
                {...register('tax')}
                variant="outlined"
                defaultValue={0}
                error={typeof errors.tax?.message !== 'undefined'}
                helperText={errors.tax?.message} />
            </Grid>
          </Grid>
          <TextField
            type="text"
            fullWidth
            sx={{ my: 1, display: 'block' }}
            id="outlined-cash-description"
            label={content.description}
            {...register('description')}
            variant="outlined"
            error={typeof errors.description?.message !== 'undefined'}
            helperText={errors.description?.message}
          ></TextField>
        </Grid>
      </Box>
      <Box
        sx={{
          mt: 'auto',
          px: '3rem',
          [theme.breakpoints.down('xs')]: {
            px: '2rem',
          },
          width: '100%',
        }}
      >
        <Button
          type="submit"
          form="buy-cash-form"
          variant="contained"
          sx={{
            bg: 'appColor.theme',
            width: '100%',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          {content.addNew}
        </Button>
      </Box>
    </Box>
  );
});
