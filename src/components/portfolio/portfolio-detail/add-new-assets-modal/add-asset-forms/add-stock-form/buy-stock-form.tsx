import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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
};

interface IProps {
  handleFormSubmit: any;
}

export const BuyStockForm = ({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
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
  });

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
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          height: 'inherit',
          overflow:'auto',
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
          sx={{ my: 1, display: 'block' }}
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
          sx={{ my: 1, display: 'block' }}
          id="outlined-amount"
          label={'*Amount'}
          {...register('amount')}
          variant="outlined"
          error={typeof errors.amount?.message !== 'undefined'}
          helperText={errors.amount?.message}
        ></TextField>
        <LocalizationProvider
          sx={{ my: 1, display: 'block' }}
          dateAdapter={AdapterDateFns}
        >
          <DesktopDatePicker
            label="*Date desktop"
            inputFormat="dd/MM/yyyy"
            value={date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          type="number"
          fullWidth
          sx={{ my: 1, display: 'block' }}
          id="outlined-broker-fee"
          label={'Broker fee'}
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
