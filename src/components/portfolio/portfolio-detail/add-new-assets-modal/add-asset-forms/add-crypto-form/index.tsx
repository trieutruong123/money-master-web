import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getSupportedCurrencyList } from 'shared/helpers';

type FormValues = {
  inputDay: Date;
  currentAmountHolding: number;
  description: string;
  buyPrice: number;
  currencyCode: string;
  bankCode?: string;
  brokerFee?: number;
  brokerFeeInPercent?: number;
  brokerFeeForSecurity?: number;
  incomeTax?: number;
};

interface IProps {
  handleFormSubmit: any;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  currentPrice: string;
}

export const BuyCryptoForm = ({
  handleFormSubmit,
  coinId,
  coinName,
  coinSymbol,
  currentPrice,
}: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    currentAmountHolding: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    buyPrice: Yup.number()
      .required('Interest rate is required')
      .typeError('Interest rate must be a number')
      .positive('Interest rate must be greater than zero'),
    currencyCode: Yup.string().required().default('USD'),
    description: Yup.string(),
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
      name: 'bitcoin',
      inputDay: date,
      currentAmountHolding: data.currentAmountHolding,
      currencyCode: data.currencyCode,
      description: 'description',
      buyPrice: data.buyPrice,
      cryptoCoinCode: 'bitcoin',
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
          type="number"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          id="outlined-purchase-price"
          label={'*Purchase Price'}
          {...register('buyPrice')}
          variant="outlined"
          error={typeof errors.buyPrice?.message !== 'undefined'}
          helperText={errors.buyPrice?.message}
        ></TextField>
        <TextField
          type="number"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          id="outlined-current-amount-holding"
          label={'*Amount'}
          {...register('currentAmountHolding')}
          variant="outlined"
          error={typeof errors.currentAmountHolding?.message !== 'undefined'}
          helperText={errors.currentAmountHolding?.message}
        ></TextField>
        <Grid container spacing={isXs ? 1 : 2}>
          <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
            <FormControl fullWidth>
              <InputLabel id="currency-list">Currency</InputLabel>
              <Select
                variant="outlined"
                labelId="currency-list"
                id="currency-list-select"
                label="*Currency"
                value="USD"
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
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="*Input day"
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
        <TextField
          type="text"
          fullWidth
          sx={{ my: 1, display: 'block' }}
          id="outlined-note"
          label={'Description'}
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
          form="buy-crypto-form"
          variant="contained"
          sx={{
            bg: colorScheme.theme,
            width: '100%',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          ADD
        </Button>
      </Box>
    </div>
  );
};
