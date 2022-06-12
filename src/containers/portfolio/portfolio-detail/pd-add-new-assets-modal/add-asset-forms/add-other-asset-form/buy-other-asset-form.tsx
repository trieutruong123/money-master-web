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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers';
import { PersonalInterestCustomAssetItem } from 'shared/models';
import { portfolioDetailStore } from 'shared/store';
import { UsingMoneySource } from 'shared/constants';
import { observer } from 'mobx-react-lite';

type FormValues = {
  name: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  customInterestAssetInfoId: number;
  inputDay: string;
  interestRate?: number;
  termRange?: number;
  description?: string;
  cashId?: number;
  fee?: number;
  tax?: number;
};

interface IProps {
  customAssetList: Array<PersonalInterestCustomAssetItem> | undefined;
  handleFormSubmit: any;
  content: any;
}

export const BuyOtherAssetForm = observer(({
  customAssetList,
  handleFormSubmit,
  content,
}: IProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const cashList = portfolioDetailStore.cashDetail;
  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    inputMoneyAmount: Yup.number()
      .required('Input money is required')
      .typeError('Input money must be a number')
      .positive('Input money must be greater than zero'),
    inputCurrency: Yup.string().required().default('USD'),
    customInterestAssetInfoId: Yup.number(),
    interestRate: Yup.number()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : 0))
      .default(0),
    termRange: Yup.number()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : 0))
      .default(0),
    description: Yup.string(),
    cashId: Yup.number(),
    fee: Yup.number(),
    tax: Yup.number()
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
    handleFormSubmit(data.customInterestAssetInfoId, {
      name: data.name,
      inputCurrency: data.inputCurrency,
      inputDay: date,
      inputMoneyAmount: data.inputMoneyAmount,
      interestRate: data.interestRate,
      termRange: data.termRange,
      description: data.description,
      isUsingInvestFund: portfolioDetailStore.selectedAsset?.moneySource === UsingMoneySource.usingFund,
      isUsingCash: portfolioDetailStore.selectedAsset?.moneySource === UsingMoneySource.usingCash,
      usingCashId: data.cashId,
      fee: data.fee,
      tax: data.tax,
    });
  };


  return (
    <div
      style={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Box
        id="buy-other-custom-asset-form"
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
          type="text"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          id="outlined-other-name"
          label={`${content.name}*`}
          {...register('name')}
          variant="outlined"
          error={typeof errors.name?.message !== 'undefined'}
          helperText={errors.name?.message}
        ></TextField>
        <TextField
          type="number"
          fullWidth
          inputProps={{
            step: 'any',
          }}
          sx={{ mt: 1, display: 'block' }}
          id="outlined-other-input-money"
          label={`${content.inputMoney}*`}
          {...register('inputMoneyAmount')}
          variant="outlined"
          error={typeof errors.inputMoneyAmount?.message !== 'undefined'}
          helperText={errors.inputMoneyAmount?.message}
        ></TextField>
        {typeof customAssetList !== 'undefined' ? (
          <FormControl
            sx={{ mt: 1, display: 'block', width: '100%' }}
            fullWidth
          >
            <InputLabel id="personal-custom-asset-type" sx={{ width: '100%' }}>
              {content.assetType}*
            </InputLabel>
            <Select
              sx={{ width: '100%' }}
              variant="outlined"
              labelId="personal-custom-asset-type"
              id="other-custom-asset-select"
              defaultValue={portfolioDetailStore.selectedAsset?.customAssetId}
              label={`${content.assetType}*`}
              {...register('customInterestAssetInfoId')}
              required
            >
              {customAssetList.map((item, index) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : null}

        <Grid container spacing={isSm ? 1 : 1}>
          <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
            <FormControl fullWidth>
              <InputLabel id="currency-list">{content.currency}*</InputLabel>
              <Select
                variant="outlined"
                labelId="currency-list"
                id="other-currency-list-select"
                label={`${content.currency}*`}
                defaultValue="USD"
                {...register('inputCurrency')}
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

        <Grid container spacing={isSm ? 1 : 1}>
          <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
            <TextField
              type="number"
              fullWidth
              id="outlined-other-interest-rate"
              inputProps={{ step: 'any' }}
              label={`${content.interestRate}`}
              {...register('interestRate')}
              variant="outlined"
              defaultValue={0}
              error={typeof errors.interestRate?.message !== 'undefined'}
              helperText={errors.interestRate?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
            <TextField
              type="number"
              fullWidth
              id="outlined-other-term-range"
              inputProps={{ step: 'any' }}
              label={`${content.termRange} (${content.months})`}
              {...register('termRange')}
              variant="outlined"
              defaultValue={0}
              error={typeof errors.termRange?.message !== 'undefined'}
              helperText={errors.termRange?.message}
            ></TextField>
          </Grid>
        </Grid>{
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
              label={`${content.tax}(%)`}
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
          id="outlined-bank-savings-desciption"
          label={content.description}
          {...register('description')}
          variant="outlined"
          error={typeof errors.description?.message !== 'undefined'}
          helperText={errors.description?.message}
        ></TextField>
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
          form="buy-other-custom-asset-form"
          variant="contained"
          sx={{
            bg: colorScheme.theme,
            width: '100%',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          {content.addNew}
        </Button>
      </Box>
    </div>
  );
});
