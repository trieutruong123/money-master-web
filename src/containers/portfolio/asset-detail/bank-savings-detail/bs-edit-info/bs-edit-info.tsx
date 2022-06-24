import { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getSupportedCurrencyList } from 'shared/helpers';
import { BankSavingItem } from 'shared/models';
import { rootStore } from 'shared/store';

interface IProps {
  assetDetail: BankSavingItem | undefined;
  handleFormSubmit: any;
}

type FormValues = {
  name: string;
  inputMoneyAmount: number;
  interestRate: number;
  termRange: number;
  inputCurrency: string;
  isGoingToReinState: boolean;
  description: string;
  bankCode: string;
  brokerFee?: number;
  brokerFeeInPercent?: number;
  brokerFeeForSecurity?: number;
  incomeTax?: number;
};

export const EditBankSavingsDetail = ({
  assetDetail,
  handleFormSubmit,
}: IProps) => {
  const [isGoingToReinState, setGoingToReinState] = useState(
    assetDetail?.isGoingToReinState || false,
  );
  const [date, setDate] = useState<Date | null>(
    dayjs(assetDetail?.inputDay).toDate(),
  );
  const [isEditing, setEdit] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    description: Yup.string(),
    bankCode: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const currencyList = getSupportedCurrencyList();

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const onSubmit: SubmitHandler<FormValues> = useCallback(async (data: any) => {
    const res: any = await handleFormSubmit({
      name: data.name,
      bankCode: data.bankCode,
      inputCurrency: data.inputCurrency,
      inputDay: date,
      inputMoneyAmount: data.inputMoneyAmount,
      isGoingToReinState,
      interestRate: data.interestRate,
      termRange: data.termRange,
      description: data.description,
    });
    if (res.isError) {
      rootStore.raiseError(res.data.en);
    } else {
      setEdit(false);
      rootStore.raiseNotification(res.data.en, 'success');
    }
  }, []);

  return typeof assetDetail !== 'undefined' ? (
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
                    id="outlined-name"
                    variant="outlined"
                    type="text"
                    label={'*Name'}
                    defaultValue={assetDetail?.name}
                    {...register('name')}
                    error={typeof errors.name?.message !== 'undefined'}
                    helperText={errors.name?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    id="outlined-input-money-amount"
                    variant="outlined"
                    type="number"
                    label={'*Input Money'}
                    defaultValue={assetDetail?.inputMoneyAmount}
                    {...register('inputMoneyAmount')}
                    error={
                      typeof errors.inputMoneyAmount?.message !== 'undefined'
                    }
                    helperText={errors.inputMoneyAmount?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    id="outlined-interest-rate"
                    variant="outlined"
                    type="number"
                    label={'*Interest Rate'}
                    defaultValue={assetDetail?.interestRate}
                    {...register('interestRate')}
                    error={typeof errors.interestRate?.message !== 'undefined'}
                    helperText={errors.interestRate?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    id="outlined-term-range"
                    variant="outlined"
                    type="number"
                    label={'*Term Range (months)'}
                    defaultValue={assetDetail?.termRange}
                    {...register('termRange')}
                    error={typeof errors.termRange?.message !== 'undefined'}
                    helperText={errors.termRange?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    id="outlined-bank-code"
                    variant="outlined"
                    type="text"
                    label={'Bank Code'}
                    defaultValue={assetDetail?.bankCode}
                    {...register('bankCode')}
                    error={typeof errors.bankCode?.message !== 'undefined'}
                    helperText={errors.bankCode?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="*Input day"
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      readOnly={!isEditing}
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
                      id="currency-list-select"
                      labelId="currency-list"
                      label="*Currency"
                      defaultValue={
                        assetDetail?.inputCurrency.toUpperCase() || 'USD'
                      }
                      variant="outlined"
                      inputProps={{ readOnly: !isEditing }}
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
                <Grid item sm={12} xs={12}>
                  <TextField
                    id="outlined-note"
                    variant="outlined"
                    type="text"
                    label={'Description'}
                    defaultValue={assetDetail?.description}
                    {...register('description')}
                    error={typeof errors.description?.message !== 'undefined'}
                    helperText={errors.description?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    rows={3}
                    multiline
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <FormControlLabel
                    sx={{
                      display: 'block',
                    }}
                    control={
                      <Switch
                        readOnly={!isEditing}
                        checked={isGoingToReinState}
                        onChange={() =>
                          setGoingToReinState(!isGoingToReinState)
                        }
                        name="loading"
                        color="primary"
                      />
                    }
                    label="Reinstate Interest Rate"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', mt: '1rem' }}>
              <Box sx={{ flex: '1 1 auto' }}></Box>

              <Button
                type="button"
                variant="contained"
                sx={{
                  ml: 'auto',
                  mr: '2rem',
                  px: '1.5rem',

                  fontSize: '1.4rem',
                  height: '3rem',
                  display: isEditing ? 'none' : 'visible',
                }}
                onClick={() => {
                  setEdit(true);
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

                  fontSize: '1.4rem',
                  height: '3rem',
                  display: isEditing ? 'visible' : 'none',
                }}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  ) : (
    <></>
  );
};
