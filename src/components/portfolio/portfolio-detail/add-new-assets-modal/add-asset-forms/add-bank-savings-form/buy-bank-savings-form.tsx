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
  useTheme,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getSupportedCurrencyList } from 'helpers';

type FormValues = {
  name: string;

  inputMoneyAmount: number;
  interestRate: number;
  termRange: number;
  inputCurrency: string;
  description?: string;
  bankCode?: string;
};

interface IProps {
  handleFormSubmit: any;
}

export const BuyBankSavingsForm = ({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    inputMoneyAmount: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    interestRate: Yup.number()
      .required('Interest rate is required')
      .typeError('Interest rate must be a number')
      .positive('Interest rate must be greater than zero'),
    termRange: Yup.number()
      .required('Term range is required')
      .typeError('Term range must be a number')
      .positive('Term range must be greater than zero'),
    inputCurrency: Yup.string().required().default('USD'),
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
    console.log('có submit nè');
    handleFormSubmit({
      name: data.name,
      bankCode: data.bankCode,
      inputCurrency: data.inputCurrency,
      inputDay: date,
      inputMoneyAmount: data.inputMoneyAmount,
      isGoingReinState: true,
      interestRate: data.interestRate,
      termRange: data.termRange,
      description: 'description',
    });
  };

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
        type="text"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-buy-price"
        label={'*Name'}
        {...register('name')}
        variant="outlined"
        error={typeof errors.name?.message !== 'undefined'}
        helperText={errors.name?.message}
      ></TextField>
      <TextField
        type="number"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-broker-fee"
        label={'*Input Money'}
        {...register('inputMoneyAmount')}
        variant="outlined"
        error={typeof errors.inputMoneyAmount?.message !== 'undefined'}
        helperText={errors.inputMoneyAmount?.message}
      ></TextField>
      <TextField
        type="number"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-broker-fee"
        label={'*Interest Rate'}
        {...register('interestRate')}
        variant="outlined"
        error={typeof errors.interestRate?.message !== 'undefined'}
        helperText={errors.interestRate?.message}
      ></TextField>
      <TextField
        type="number"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-broker-fee"
        label={'*Term Range (months)'}
        {...register('termRange')}
        variant="outlined"
        error={typeof errors.termRange?.message !== 'undefined'}
        helperText={errors.termRange?.message}
      ></TextField>
      <FormControl sx={{ my: 1 }} fullWidth>
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
      <LocalizationProvider
        sx={{ my: 1, display: 'block' }}
        dateAdapter={AdapterDateFns}
      >
        <DesktopDatePicker
          label="*Input day"
          inputFormat="dd/MM/yyyy"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        type="text"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-amount"
        label={'Bank Code'}
        {...register('bankCode')}
        variant="outlined"
        error={typeof errors.bankCode?.message !== 'undefined'}
        helperText={errors.bankCode?.message}
      ></TextField>

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
