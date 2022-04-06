import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getSupportedCurrencyList } from 'helpers';

type FormValues = {
  purchasePrice: number;
  currentPrice: number;
  date: Date;
  name: string;
  currency?: string;
  description?: string;
  brokerFeeInPercent?: number;
  brokerFee?: number;
  brokerFeeForSecurity?: number;
  incomeTax?: number;
};

interface IProps {
  handleFormSubmit: any;
}

export const BuyRealEstateForm = ({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [date, setDate] = useState<Date | null>(new Date());

  const validationSchema = Yup.object().shape({
    currency: Yup.string().required().default('USD'),
    name: Yup.string().required('Name is required'),
    purchasePrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    currentPrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
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
      inputMoneyAmount: data.purchasePrice,
      inputCurrency: data.currency,
      buyPrice: data.purchasePrice,
      currentPrice: data.currentPrice,
      name: data.name,
      description: data.description,
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
        id="buy-real-estate-form"
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
            type="text"
            fullWidth
            sx={{  mt: 1, display: 'block' }}
            id="outlined-name"
            label={'*Name'}
            {...register('name')}
            variant="outlined"
            error={typeof errors.name?.message !== 'undefined'}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            type="number"
            fullWidth
            sx={{ mt: 1, display: 'block' }}
            id="outlined-purchase-price"
            label={'*Purchase Price'}
            {...register('purchasePrice')}
            variant="outlined"
            error={typeof errors.purchasePrice?.message !== 'undefined'}
            helperText={errors.purchasePrice?.message}
          ></TextField>
          <TextField
            type="number"
            fullWidth
            sx={{  mt: 1, display: 'block' }}
            id="outlined-current-price"
            label={'*Current Price'}
            {...register('currentPrice')}
            variant="outlined"
            error={typeof errors.currentPrice?.message !== 'undefined'}
            helperText={errors.currentPrice?.message}
          ></TextField>

          <Grid container spacing={isXs ? 1 : 2}>
            <Grid item xs={12} sm={6} sx={{ mt: 1 ,display: 'block' }}>
              <FormControl fullWidth>
                <InputLabel id="currency-list">Currency</InputLabel>
                <Select
                  variant="outlined"
                  labelId="currency-list"
                  id="currency-list-select"
                  label="Currency"
                  value="USD"
                  {...register('currency')}
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
            <Grid item xs={12} sm={6} sx={{  mt: 1,display: 'block' }}>
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
            id="outlined-description"
            label={'Description'}
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
          form="buy-real-estate-form"
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
    </Box>
  );
};
