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
import { getSupportedCurrencyList } from 'shared/helpers';
import CheckBoxButton from 'shared/components/checkbox';

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
  content: any;
}

export const BuyRealEstateForm = ({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [checked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());

  const validationSchema = Yup.object().shape({
    currency: Yup.string().required().default('USD'),
    name: Yup.string().required('Name is required'),
    purchasePrice: Yup.number()
      .required('Purchase price is required')
      .typeError('Purchase price must be a number')
      .positive('Purchase price must be greater than zero'),
    currentPrice: Yup.number()
      .required('Current price is required')
      .typeError('Current price must be a number')
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
      isUsingInvestFund: checked,
    });
  };

  const handleChangeCheckBox = (isCheck: boolean) => {
    setChecked(isCheck);
  }

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
            sx={{ mt: 1, display: 'block' }}
            id="outlined-real-estate-name"
            label={`*${content.name}`}
            {...register('name')}
            variant="outlined"
            error={typeof errors.name?.message !== 'undefined'}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            type="number"
            fullWidth
            inputProps={{ step: 'any' }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-real-estate-purchase-price"
            label={`*${content.purchasePrice}`}
            {...register('purchasePrice')}
            variant="outlined"
            error={typeof errors.purchasePrice?.message !== 'undefined'}
            helperText={errors.purchasePrice?.message}
          ></TextField>
          <TextField
            type="number"
            fullWidth
            inputProps={{ step: 'any' }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-real-estate-current-price"
            label={`*${content.currentPrice}`}
            {...register('currentPrice')}
            variant="outlined"
            error={typeof errors.currentPrice?.message !== 'undefined'}
            helperText={errors.currentPrice?.message}
          ></TextField>

          <Grid container spacing={isXs ? 1 : 2}>
            <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
              <FormControl fullWidth>
                <InputLabel id="currency-list">{content.currency}</InputLabel>
                <Select
                  variant="outlined"
                  labelId="currency-list"
                  id="real-estate-currency-list-select"
                  label={`*${content.currency}`}
                  defaultValue="USD"
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
            <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'block' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label={`*${content.inputDay}`}
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
            id="outlined-real-estate-description"
            label={content.description}
            {...register('description')}
            variant="outlined"
            error={typeof errors.description?.message !== 'undefined'}
            helperText={errors.description?.message}
          ></TextField>
          <Box display='flex' flexDirection='row' alignItems='center' justifyContent={'start'} sx={{ my: 1 }}>
            <CheckBoxButton color='primary' onChange={handleChangeCheckBox} />
            <h4>Is money from invest fund?</h4>
          </Box>
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
};
