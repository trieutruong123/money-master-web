import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { colorScheme } from 'utils/color-scheme';

type FormValues = {
  pricePerShare: number;
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
  comeBack: any;
}

export const CreateCryptoForm = observer(({ comeBack }: IProps) => {
  const theme = useTheme()
  const [date, setDate] = useState<Date | null>(new Date());
  const [focusedButtonKey, setFocusedButtonKey] = useState(1);
  const validationSchema = Yup.object().shape({
    pricePerShare: Yup.number().required('Price per share is missing'),
    amount: Yup.number().required('Amount is missing'),
  });
  
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const buttonLabels = ['Buy', 'Sell', 'Divident'];

  const handleComeback = () => {
    comeBack();
  };

  const handleSelectionChanged = (key: number) => {
    setFocusedButtonKey(key);
  };

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {};

  return (
    <Box>
      <Box mt="1rem">
        <Typography align="center" id="modal-modal-title" variant="h4">
          Transaction
        </Typography>
        <IconButton
          sx={{ position: 'absolute', left: '2rem' , top: '1rem' }}
          onClick={handleComeback}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{ ml: '3rem', mt: '1rem' }}>
        <ButtonGroup aria-label="outlined primary button group">
          {buttonLabels.map((item: string, key: number) => {
            return (
              <Button
                key={key.toString()}
                variant={key === focusedButtonKey ? 'contained' : 'outlined'}
                onClick={() => handleSelectionChanged(key)}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          mx: '3rem',
          mt: '1rem',
          [theme.breakpoints.down('xs')]:{
            mx: '2rem',
          }
        }}
      >
        <TextField
          type="number"
          fullWidth
          sx={{ my: 1, display: 'block' }}
          id="outlined-price-per-share"
          label={'*Price per share'}
          {...register('pricePerShare')}
          variant="outlined"
          error={typeof errors.pricePerShare?.message !== 'undefined'}
          helperText={errors.pricePerShare?.message}
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          sx={{ bg: colorScheme.theme }}
        >
          Add new
        </Button>
      </Box>
    </Box>
  );
});
