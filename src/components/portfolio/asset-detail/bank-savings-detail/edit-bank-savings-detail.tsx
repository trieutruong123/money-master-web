import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getSupportedCurrencyList } from 'helpers';
import { colorScheme } from 'utils';

type FormValues = {
  name: string;
  inputMoneyAmount: number;
  interestRate: number;
  termRange: number;
  inputCurrency: string;
  isGoingToReinState: boolean;
  description?: string;
  bankCode?: string;
  brokerFee?: number;
  brokerFeeInPercent?: number;
  brokerFeeForSecurity?: number;
  incomeTax?: number;
};

export const EditBankSavingsDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [date, setDate] = useState<Date | null>(new Date());
  const [isEditing, setEdit] = useState(false);

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
    //   handleFormSubmit({
    //     name: data.name,
    //     bankCode: data.bankCode,
    //     inputCurrency: data.inputCurrency,
    //     inputDay: date,
    //     inputMoneyAmount: data.inputMoneyAmount,
    //     isGoingReinState: true,
    //     interestRate: data.interestRate,
    //     termRange: data.termRange,
    //     description: 'description',
    //   });
  };

  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: isMobile ? '5px' : '5px 20px 20px 20px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: 'none',
            flexDirection: 'column',
          }}
        >
          <CardHeader title="Bank Savings Detail" sx={{ py: '1rem' }} />
          <CardContent
            sx={{
              width: '100%',
              padding: isMobile ? '32px 0px' : 'initial',
            }}
          >
            <Box
              id="edit-bank-savings-form"
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item sm={12} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    type="text"
                    fullWidth
                    id="outlined-name"
                    label={'*Name'}
                    {...register('name')}
                    variant="outlined"
                    error={typeof errors.name?.message !== 'undefined'}
                    helperText={errors.name?.message}
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    type="number"
                    fullWidth
                    id="outlined-input-money-amount"
                    label={'*Input Money'}
                    {...register('inputMoneyAmount')}
                    variant="outlined"
                    error={
                      typeof errors.inputMoneyAmount?.message !== 'undefined'
                    }
                    helperText={errors.inputMoneyAmount?.message}
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    type="number"
                    fullWidth
                    id="outlined-interest-rate"
                    label={'*Interest Rate'}
                    {...register('interestRate')}
                    variant="outlined"
                    error={typeof errors.interestRate?.message !== 'undefined'}
                    helperText={errors.interestRate?.message}
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    type="number"
                    fullWidth
                    id="outlined-term-range"
                    label={'*Term Range (months)'}
                    {...register('termRange')}
                    variant="outlined"
                    error={typeof errors.termRange?.message !== 'undefined'}
                    helperText={errors.termRange?.message}
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    type="text"
                    fullWidth
                    id="outlined-bank-code"
                    label={'Bank Code'}
                    {...register('bankCode')}
                    variant="outlined"
                    error={typeof errors.bankCode?.message !== 'undefined'}
                    helperText={errors.bankCode?.message}
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
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
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <FormControl fullWidth>
                    <InputLabel id="currency-list">*Currency</InputLabel>
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
                <Grid item sm={12} xs={12} >
                  <TextField
                    type="text"
                    fullWidth
                    id="outlined-note"
                    multiline
                    rows={3}
                    label={'Description'}
                    {...register('description')}
                    variant="outlined"
                    error={typeof errors.description?.message !== 'undefined'}
                    helperText={errors.description?.message}
                  ></TextField>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', width: '100%' ,mt:'1rem'}}>
                <Box sx={{ flex: '1 1 auto' }}></Box>
                <Button
                  type="submit"
                  form="edit-bank-savings-form"
                  variant="contained"
                  sx={{
                    ml: 'auto',
                    mr: '2rem',
                    px: '1.5rem',
                    bg: colorScheme.theme,
                    fontSize: '1.4rem',
                    height: '3rem',
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  type="submit"
                  form="edit-bank-savings-form"
                  variant="contained"
                  sx={{
                    ml: 'auto',
                    mr: '2rem',
                    px: '1.5rem',
                    bg: colorScheme.theme,
                    fontSize: '1.4rem',
                    height: '3rem',
                  }}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};
