import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { getSupportedCurrencyList } from 'shared/helpers';
import { colorScheme } from 'utils';
import { RealEstateItem } from 'shared/models';
import { rootStore } from 'shared/store';

interface IProps {
  assetDetail: RealEstateItem | undefined;
  handleFormSubmit: any;
}

type FormValues = {
  name: string;
  currentPrice: number;
  inputMoneyAmount: number;
  inputCurrency: string;
  description: string;
  brokerFee?: number;
  brokerFeeInPercent?: number;
  brokerFeeForSecurity?: number;
  incomeTax?: number;
};

export const EditRealEstateDetail = ({
  assetDetail,
  handleFormSubmit,
}: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [date, setDate] = useState<Date | null>(
    dayjs(assetDetail?.inputDay).toDate(),
  );
  const [isEditing, setEdit] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    inputMoneyAmount: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    currentPrice: Yup.number()
      .required('Current price is required')
      .typeError('Current price must be a number')
      .positive('Current price must be greater than zero'),
    inputCurrency: Yup.string().required().default('USD'),
    description: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const currencyList = getSupportedCurrencyList();

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const res: any = await handleFormSubmit({
      name: data.name,
      inputCurrency: data.inputCurrency,
      inputDay: date,
      inputMoneyAmount: data.inputMoneyAmount,
      currentPrice: data.currentPrice,
      description: data.description,
    });
    if (res.isError) {
      toast.error(res.data.en, {
        onClose: () => {
          rootStore.deleteNotification();
        },
      });
    } else {
      setEdit(false);
      toast.success(res.data.en, {
        onClose: () => {
          rootStore.deleteNotification();
        },
      });
    }
  };

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
          <CardHeader title="Real Estate Detail" sx={{ py: '1rem' }} />
          <CardContent
            sx={{
              width: '100%',
              padding: isMobile ? '32px 0px' : 'initial',
            }}
          >
            <Box
              id="edit-real-estate-form"
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item sm={12} xs={12} sx={{ height: '5.7rem' }}>
                  <TextField
                    id="outlined-name"
                    type="text"
                    variant="outlined"
                    defaultValue={assetDetail?.name}
                    label={'*Name'}
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
                    type="number"
                    defaultValue={assetDetail?.inputMoneyAmount}
                    label={'*Input Money'}
                    {...register('inputMoneyAmount')}
                    variant="outlined"
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
                    id="outlined-current-price"
                    type="number"
                    variant="outlined"
                    defaultValue={assetDetail?.currentPrice}
                    label={'*Current Price'}
                    {...register('currentPrice')}
                    error={typeof errors.currentPrice?.message !== 'undefined'}
                    helperText={errors.currentPrice?.message}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ height: '5.7rem' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      readOnly={!isEditing}
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
                      id="currency-list-select"
                      variant="outlined"
                      labelId="currency-list"
                      label="*Currency"
                      defaultValue={
                        assetDetail?.inputCurrency.toUpperCase() || 'USD'
                      }
                      {...register('inputCurrency')}
                      inputProps={{ readOnly: !isEditing }}
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
                    id="outlined-description"
                    type="text"
                    defaultValue={assetDetail?.description}
                    label={'Description'}
                    {...register('description')}
                    variant="outlined"
                    error={typeof errors.description?.message !== 'undefined'}
                    helperText={errors.description?.message}
                    rows={3}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    fullWidth
                    multiline
                  ></TextField>
                </Grid>
              </Grid>{' '}
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
                  form="edit-real-estate-form"
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
            </Box>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  ) : (
    <></>
  );
};
