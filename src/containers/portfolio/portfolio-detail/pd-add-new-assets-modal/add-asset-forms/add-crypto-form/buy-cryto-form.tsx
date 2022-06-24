import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers';
import { observer } from 'mobx-react-lite';
import { portfolioDetailStore } from 'shared/store';
import { UsingMoneySource } from 'shared/constants';

type FormValues = {
  name: string;
  currentAmountHolding: number;
  description: string;
  purchasePrice: number;
  currencyCode: string;
  cashId?: number;
  fee?: number;
  tax?: number;
};

interface IProps {
  handleFormSubmit: any;
  content: any;
}

export const BuyCryptoForm = observer(({
  content,
  handleFormSubmit,
}: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const cashList = portfolioDetailStore.cashDetail;
  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    purchasePrice: Yup.number()
      .required(' Purchase price is required')
      .typeError('Purchase price must be a number')
      .positive('Purchase price must be greater than zero'),
    currentAmountHolding: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    currencyCode: Yup.string().required().default('USD'),
    cashId: Yup.number(),
    tax: Yup.number()
          .typeError('Tax must be a number')
          .min(0,'Tax must be greater than zero'),
    fee: Yup.number()
      .typeError('Fee must be a number')
      .min(0,'Fee must be greater than zero'),
    description: Yup.string(),
  });
  const currencyList = getSupportedCurrencyList();

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    handleFormSubmit({
      name: data.name,
      inputDay: date,
      currentAmountHolding: data.currentAmountHolding,
      description: data.description,
      purchasePrice: data.purchasePrice,
      currencyCode: data.currencyCode,
      cryptoCoinCode: portfolioDetailStore?.selectedAsset?.cryptoCoinCode,
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
        id="buy-crypto-form"
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
        <TextField
          type="string"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          id="outlined-crypto-name"
          label={`${content.name}*`}
          {...register('name')}
          variant="outlined"
          error={typeof errors.name?.message !== 'undefined'}
          helperText={errors.name?.message}
        ></TextField>
        <TextField
          type="number"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          id="outlined-crypto-purchase-price"
          inputProps={{ step: 'any' }}
          label={`${content.purchasePrice}*`}
          {...register('purchasePrice')}
          variant="outlined"
          error={typeof errors.purchasePrice?.message !== 'undefined'}
          helperText={errors.purchasePrice?.message}
        ></TextField>
        <TextField
          type="number"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          inputProps={{ step: 'any' }}
          id="outlined-crypto-current-amount-holding"
          label={`${content.amount}*`}
          {...register('currentAmountHolding')}
          variant="outlined"
          error={typeof errors.currentAmountHolding?.message !== 'undefined'}
          helperText={errors.currentAmountHolding?.message}
        ></TextField>
        <Grid container spacing={isXs ? 1 : 2}>
          <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
            <FormControl fullWidth>
              <InputLabel id="currency-list">{content.currency}*</InputLabel>
              <Select
                variant="outlined"
                labelId="currency-list"
                id="crypto-currency-list-select"
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
                <InputLabel id="select-cash-source">{content.selectCashSource}*</InputLabel>
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
          id="outlined-crypto-description"
          label={content.description}
          {...register('description')}
          variant="outlined"
          error={typeof errors.description?.message !== 'undefined'}
          helperText={errors.description?.message}
        ></TextField>
        {/* <Box display='flex' flexDirection='row' alignItems='center' justifyContent={'start'} sx={{ mb: 1 }}>
          <CheckBoxButton color='primary' onChange={handleChangeCheckBox} />
          <h4>Is money from invest fund?</h4>
        </Box> */}
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
          form="buy-crypto-form"
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
