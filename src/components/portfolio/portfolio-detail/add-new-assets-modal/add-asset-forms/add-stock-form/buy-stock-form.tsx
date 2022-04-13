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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getSupportedCurrencyList } from 'shared/helpers';

type FormValues = {
  purchasePrice: number;
  amount: number;
  date: Date;
  currency?: string;
  note?: string;
  brokerFeeInPercent?: number;
  brokerFee?: number;
  brokerFeeForSecurity?: number;
  incomeTax?: number;
  inputCurrency: string;
};

interface IProps {
  handleFormSubmit: any;
}

export const BuyStockForm = ({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    dividendPerShare: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    inputCurrency: Yup.string().required().default('USD'),
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
    handleFormSubmit(data);
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
        id="buy-stocks-form"
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
          sx={{ mt: 1, display: 'block' }}
          id="outlined-amount"
          label={'*Shares'}
          {...register('amount')}
          variant="outlined"
          error={typeof errors.amount?.message !== 'undefined'}
          helperText={errors.amount?.message}
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
                {...register('inputCurrency')}
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
                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <TextField
          type="number"
          fullWidth
          sx={{ mt: 1, display: 'block' }}
          id="outlined-broker-fee"
          label={'Fee'}
          {...register('brokerFee')}
          variant="outlined"
        ></TextField>
        <TextField
          type="text"
          fullWidth
          sx={{ my: 1, display: 'block' }}
          id="outlined-note"
          label={'Note'}
          {...register('note')}
          variant="outlined"
          error={typeof errors.note?.message !== 'undefined'}
          helperText={errors.note?.message}
        ></TextField>{' '}
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
          form="buy-stocks-form"
          variant="contained"
          sx={{
            bg: 'appColor.theme',
            width: '100%',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          ADD
        </Button>
      </Box>
    </Box>
  );
};
